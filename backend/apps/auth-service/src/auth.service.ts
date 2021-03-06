import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { addDays, compareAsc } from 'date-fns';

import { UserService } from '../../user-service/src/user.service';
import { TokenService } from '../../token-service/src/token.service';
import { MailServiceService } from '../../shared/mail-service/src//mail-service.service';

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
    
    private async mailSend(email: string, message: string, token: string) {
        switch(message) {
            case 'New User': 
                await this.mailService.confirmEmail(email, token);
                break;
            case 'Forgot Password':
                await this.mailService.changePass(email, token);
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
            throw new RpcException('User was not found');
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new RpcException('Password is not correct');
        }

        if(user.status !== statusEnum.active) {
            throw new RpcException('Confirm your email');
        }

        const token = this.accessToken(user);

        const expiredAt = addDays(Date.now(), 1);

        return await this.createToken({
            token,
            uId: user._id,
            expiredAt,
        });
        
    }

    async signUp(createUserDto: CreateUserDto) {
        const findEmail = await this.userService.findUserByEmail(createUserDto.email);
        const findLogin = await this.userService.findUserByLogin(createUserDto.login);

        if(findEmail) {
            throw new RpcException('This email is already registered in system');
        }
        if(findLogin) {
            throw new RpcException('This username is taken. Try another');
        }

        const user = await this.userService.createUser(
            createUserDto,
            rolesEnum.user, 
            statusEnum.pending,
        );

        const expiresIn = 60 * 60 * 24;

        const token = this.accessToken(user, { expiresIn });

        await this.mailSend(user.email, 'New User', token);

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
            throw new RpcException('User was not found');
        }

        const expiresIn = 60 * 60 * 24;

        const token = this.accessToken(user, { expiresIn });

        const expiredAt = addDays(Date.now(), 1);

        await this.mailSend(email, 'Forgot Password', token);
        await this.createToken({
            token,
            uId: user._id,
            expiredAt,
        });

        return true;
    }

    async changePass(token: string, password: string) {
        const userId = (await this.tokenService.find(token)).uId;
        await this.tokenService.deleteAll(userId);
        await this.userService.updateUser(userId, { password });

        return true;
    }

    async confirmEmail(token: string) {
        const userId = (await this.tokenService.find(token)).uId;
        await this.userService.updateUser(userId, { status: 'active' });
        await this.tokenService.delete(token);
        return true;
    }

    async logout(token: string) {
        await this.tokenService.delete(token);
        return true;
    }

}
