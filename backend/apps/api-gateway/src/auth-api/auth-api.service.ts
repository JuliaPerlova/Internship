import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';

@Injectable()
export class AuthApiService {
    private authClient: ClientProxy;

    constructor() {
        this.authClient = ClientProxyFactory.create({ 
            transport: Transport.TCP, 
            options: {
                host: 'localhost',
                port: 8080,
            },
        });
    }

    async login(data: object) {
        return await this.authClient.send<object>({ cmd: 'login' }, data)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    signUp(data: object) {
        return this.authClient.send<object>({ cmd: 'sign up' }, data)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    checkToken(token: string) {
        return this.authClient.send<object>({ cmd: 'check token'}, token)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    forgotPass(email) {
        return this.authClient.send<object>({ cmd: 'forgot password' }, email)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    changePass(data) {
        return this.authClient.send<object>({ cmd: 'change password' }, data)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    confirmEmail(token: string) {
        return this.authClient.send<object>({ cmd: 'confirmation'}, token);
    }
    
    logout(token: string) {
        return this.authClient.send<object>({ cmd: 'logout'}, token);
    }
}