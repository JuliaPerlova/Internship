import { Injectable } from '@nestjs/common';
import { ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';
<<<<<<< HEAD
import { TokenService } from '../../token-service/src/token.service';
||||||| merged common ancestors
import { MailServiceService } from '../../mail-service/src/mail-service.service';
=======
>>>>>>> e4260416130bcb4fa3e9a4898bee15d48b885668
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  private authClient: ClientProxy;
  private userClient: ClientProxy;

<<<<<<< HEAD
  constructor(private readonly tokenService: TokenService) {
||||||| merged common ancestors
  constructor(private readonly mailService: MailServiceService) {
=======
  constructor() {
>>>>>>> e4260416130bcb4fa3e9a4898bee15d48b885668
    this.authClient = ClientProxyFactory.create({ 
      transport: Transport.TCP, 
      options: {
        host: 'localhost',
        port: 8080,
      },
    });
    this.userClient = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 8090,
      }
    })
  }

  getHello(): string {
    return 'Hello World!';
  }

  login(data: object) {
    return this.authClient.send<object>({ cmd: 'login' }, data);
  }

  signUp(data: object) {
    return this.authClient.send<object>({ cmd: 'sign up' }, data);
  }

  forgotPass(email) {
    return this.authClient.send<object>({ cmd: 'forgot password' }, email);
  }

  changePass(data: object) {
    return this.authClient.send<object>({ cmd: 'change password' }, data);
  }

  confirmEmail(data: object) {
    return this.authClient.send<object>({ cmd: 'confirmation'}, data);
  }

  createUser(data: object) {
    return this.userClient.send<object>({ cmd: 'createUser'}, data);
  }

  getAllUsers() {
    return this.userClient.send<string>({ cmd: 'getAllUsers' }, {});
  }

  findUser(id: string) {
    return this.userClient.send<string>({ cmd: 'findUser'}, id);
  }

  updateUser(id: string, newData: object) {
    return this.userClient.send<object>({ cmd: 'updateUser' }, { id,  ...newData });
  }

  deleteUser(id: string) {
    return this.userClient.send<string>({ cmd: 'deleteUser' }, id);
  }
<<<<<<< HEAD

  deleteToken(id: string) {
    return this.tokenService.deleteAll(id);
  }
||||||| merged common ancestors

  async sendMail({ id, email, token }) {
    return await this.mailService.changePass(id, email, token);
  }
=======
>>>>>>> e4260416130bcb4fa3e9a4898bee15d48b885668
}
