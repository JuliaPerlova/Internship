import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { addDays } from 'date-fns';

import { UserService } from '../../user-service/src/user.service';
import { TokenService } from '../../token-service/src/token.service';
import { MailServiceService } from '../../mail-service/src//mail-service.service';

import { CreateUserDto } from '../../user-service/src/dto/create-user.dto';
import { CreateUserTokenDto } from '../../token-service/src/dto/create-user-token.dto';
import { IUser } from '../../user-service/src/interfaces/user.interface';
import { statusEnum } from '../../user-service/src/enums/status.enum';
import { rolesEnum } from '../../user-service/src/enums/roles.enum';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly mailService: MailServiceService,
        private readonly jwtService: JwtService,
    ) {}
    
    async mailSend(email: string, message: string, token: string, id: string) {
        const user = this.userService.findUserByEmail(email);

        if(!user) {
            throw new UnauthorizedException();
        }

        switch(message) {
            case 'New User': 
                await this.mailService.confirmEmail(email, id, token,);
                break;
            case 'Forgot password':
                await this.mailService.changePass(email, id, token);
                break;
        }
    }

    private accessToken(user: IUser, options?: object) {
        const payload = {
            uId: user._id,
            status: user.status,
            roles: user.role,
        }

        return this.jwtService.sign(payload, options);
    }

    private async createToken(createUserTokenDto: CreateUserTokenDto) {
        return await this.tokenService.create(createUserTokenDto);
    }


    async signIn({ email, password }: LoginDto) {
        const user = await this.userService.findUserByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new ForbiddenException();
        }

        if(user.status !== statusEnum.active) {
            throw new ForbiddenException();
        }

        const token = this.accessToken(user);

        const expiredAt = addDays(Date.now(), 1);

        await this.createToken({
            token,
            uId: user._id,
            expiredAt,
        });
        
        return true;
    }

    async signUp(createUserDto: CreateUserDto) {
        const pass = createUserDto.password;

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(pass, salt);
        const saltUser = { ...createUserDto, password };
        const user = await this.userService.createUser(
            saltUser,
            rolesEnum.user, 
            statusEnum.pending,
        );

        const expiresIn = 60 * 60 * 24;

        const token = this.accessToken(user, { expiresIn });

        await this.mailSend(user.email, 'New User', token, user._id);

        const expiredAt = addDays(Date.now(), 1);

        await this.createToken({
            token,
            uId: user._id,
            expiredAt,
        });

        return true;
    }

    async forgotPass(email: string) {
        const user = await this.userService.findUserByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }

        const expiresIn = 60 * 60 * 24;
        const token = this.accessToken(user, { expiresIn });
        await this.mailSend(email, 'Forgot Password', user._id, token);
        return true;
    }

    async changePass(userId: string, password: string) {
        await this.tokenService.deleteAll(userId);
        await this.userService.updateUser(userId, password);
        return true;
    }

    async confirmEmail(userId, token) {
        const check = await this.tokenService.exists(userId, token);
        if (!check) {
            throw new ForbiddenException();
        }

        await this.userService.updateUser(userId, { status: 'active' });
        return true;
    }

}