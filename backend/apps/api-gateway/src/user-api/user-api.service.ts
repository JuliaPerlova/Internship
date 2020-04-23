import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';

@Injectable()
export class UserApiService {
    private userClient: ClientProxy;

    constructor() {
        this.userClient = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
              host: 'localhost',
              port: 8090,
            }
        })
    }

    getUser(token: string, uId: string) {
        return this.userClient.send<object>({ cmd: 'find user' }, { token, uId })
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    updateUser(token: string, uId: string,  data: object) {
        return this.userClient.send<object>({ cmd: 'update user' }, { token, uId, data })
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    deleteUser(token: string, uId: string) {
        return this.userClient.send<object>({ cmd: 'delete user' }, { token, uId })
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }
}