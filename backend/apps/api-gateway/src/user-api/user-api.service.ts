import { Injectable } from '@nestjs/common';
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

}