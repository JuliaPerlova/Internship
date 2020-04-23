import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';

@Injectable()
export class PostApiService {
    private appClient: ClientProxy;

    constructor() {
        this.appClient = ClientProxyFactory.create({ 
            transport: Transport.TCP, 
            options: {
                host: 'localhost',
                port: 8060,
            },
        });
    }

    getTemplate(providers: string[]) {
        return this.appClient.send<string>({ cmd: 'get template' }, providers)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN )});
    } 

    getPosts(token: string, uId: string) {
        return this.appClient.send<object>({ cmd: 'get posts' }, { token, uId })
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    createPost(token: string, data: object, template: object) {
        return this.appClient.send<object>({ cmd: 'create post' }, { token, data, template })
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    findPost(token: string, postId: string) {
        return this.appClient.send<object>({ cmd: 'find post'}, { token, postId })
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    updatePost(postId: string, token: string, data: object) {
        return this.appClient.send<object>({ cmd: 'update post' }, { postId, token, data })
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    deletePost(token: string, postId: string) {
        return this.appClient.send<object>({ cmd: 'delete post' }, { token, postId })
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }
}