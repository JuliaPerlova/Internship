import { Catch, ArgumentsHost, Logger, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
    catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
        const status = 404;

        const errorRes = {
                code: status,
                timestamp: new Date().toISOString(),
                description: exception.getError(),
        };

        Logger.error(exception.getError(), 'ExceptionFilter');
        return throwError(errorRes);
    }
}