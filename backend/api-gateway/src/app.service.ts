import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  @Client({ transport: Transport.REDIS, options: {
    url: 'redis://localhost:6379',
  }})
  client: ClientProxy;

  getHello(): string {
    return 'Hello World!';
  }

  createUser(data: object) {
    return this.client.send<object>({ cmd: 'createUser'}, {data});
  }

  getAllUsers() {
    return this.client.send<string>({ cmd: 'getAllUsers' }, {});
  }

  findUser(id: string) {
    return this.client.send<string>({ cmd: 'findUser'}, { id });
  }

  updateUser(id: string, newData: object) {
    return this.client.send<object>({ cmd: 'updateUser' }, { id, newData });
  }

  deleteUser(id: string) {
    return this.client.send<string>({ cmd: 'deleteUser' }, { id });
  }
}
