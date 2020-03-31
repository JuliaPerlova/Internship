import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const errorRes = {
                code: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                method: request.method,
                description: exception.message,
        };

        Logger.error(`${request.method} ${request.url}`, exception.stack, 'ExceptionFilter');

        response.status(status).json(errorRes);
    }
}
