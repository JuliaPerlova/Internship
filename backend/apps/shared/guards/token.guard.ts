import { Injectable, CanActivate, ExecutionContext, HttpStatus, Inject, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TokenGuard implements CanActivate {
    constructor(@Inject('TokenService') private readonly TokenService){}

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const id = request.params.id;
        const token = request.params.token;
        const findToken = await this.TokenService.find(id, token);
        const now = new Date();

        if(findToken && new Date(findToken.expiredAt) > now) {
            return true;
        }
        throw new HttpException('this link was expired', HttpStatus.NOT_FOUND);
    }
}