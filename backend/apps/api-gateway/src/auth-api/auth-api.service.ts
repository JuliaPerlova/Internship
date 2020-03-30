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

    login(data: object) {
        return this.authClient.send<object>({ cmd: 'login' }, data)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    signUp(data: object) {
        return this.authClient.send<object>({ cmd: 'sign up' }, data)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    checkToken(data: object) {
        return this.authClient.send<object>({ cmd: 'check token'}, data)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    forgotPass(email) {
        return this.authClient.send<object>({ cmd: 'forgot password' }, email)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    changePass(data: object) {
        return this.authClient.send<object>({ cmd: 'change password' }, data)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    confirmEmail(data: object) {
        return this.authClient.send<object>({ cmd: 'confirmation'}, data);
    }
    
    logout(data: object) {
        return this.authClient.send<object>({ cmd: 'logout'}, data);
    }
}