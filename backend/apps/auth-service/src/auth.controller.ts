import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsePipes } from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../../user-service/src/dto/create-user.dto';

import { IUserToken } from '../../token-service/src/interfaces/user-token.interface';

import { ValidationPipe } from '../../shared/pipes/src/validation.pipe';

import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login'})
  @UsePipes(ValidationPipe)
  async login({ email, password }: LoginDto): Promise<IUserToken> {
      return await this.authService.signIn({ email, password });
  }

  @MessagePattern({ cmd: 'sign up' })
  @UsePipes(ValidationPipe)
  async signUp(createUserDto: CreateUserDto): Promise<boolean> {
      return await this.authService.signUp(createUserDto);
  }

  @MessagePattern({ cmd: 'forgot password' })
  async forgotPass(email: string): Promise<boolean> {
      return await this.authService.forgotPass(email);
  }

  @MessagePattern({ cmd: 'change password' })
  async changePass({ id, token, password }): Promise<boolean> {
    return await this.authService.changePass(id, token, password);
  }

  @MessagePattern({cmd: 'confirmation'})
  async confirmEmail({ id, token }): Promise<boolean> {
    return await this.authService.confirmEmail(id, token);
  }

  @MessagePattern({ cmd: 'logout' })
  async logout({ id, token }): Promise<boolean> {
    return await this.authService.logout(id, token);
  }
}
