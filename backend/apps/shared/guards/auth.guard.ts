import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject('TokenService') private readonly TokenService){}

    async canActivate(context: ExecutionContext){
        const { token } = context.switchToHttp().getRequest();
        const findToken = await this.TokenService.find(token);
        const now = new Date();

        if(findToken && new Date(findToken.expiredAt) > now) {
            return true;
        }
        throw new RpcException('this link was expired');
    }
}