import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { CreateUserDto } from '../../user-service/src/dto/create-user.dto';

import { LoginDto } from './dto/login.dto';


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login'})
  async login({ email, password }: LoginDto): Promise<string> {
      return await this.authService.signIn({ email, password });
  }

  @MessagePattern({ cmd: 'sign up' })
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
}
