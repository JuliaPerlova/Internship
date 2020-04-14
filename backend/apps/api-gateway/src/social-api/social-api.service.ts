import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';

@Injectable()
export class SocialApiService {
    private appClient: ClientProxy;

    constructor() {
        this.appClient = ClientProxyFactory.create({ 
            transport: Transport.TCP, 
            options: {
                host: 'localhost',
                port: 8050,
            },
        });
    }

    createConnection(data: object) {
        return this.appClient.send<object>({ cmd: 'create connection' }, data)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    getProfile(provider: string, uId: string) {
        return this.appClient.send<object>({ cmd: 'get profile' }, { provider, uId })
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    getAll(uId: string) {
        return this.appClient.send<object>({ cmd: 'get all user profiles' }, uId)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    findProfileByPId(provider: string, providerId: string) {
        return this.appClient.send<object>({ cmd: 'find profile by provider id'}, { provider, providerId })
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    updateProfile(provider: string, providerId: string, data: object) {
        return this.appClient.send<object>({ cmd: 'update profile' }, { provider, providerId, data })
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    deleteProfile(provider, providerId: string) {
        return this.appClient.send<object>({ cmd: 'delete profile' }, { provider, providerId })
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }
}