import { Catch, ArgumentsHost, Logger, ExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost) {
        const status = 1100;
        const err = exception.message.split('key:')[1];

        const errorRes = {
                code: status,
                timestamp: new Date().toISOString(),
                description: exception.errmsg,
                message: `This ${err} already exist in system`,
        };

        Logger.error(`${exception.message}`, 'ExceptionFilter');
        return throwError(errorRes)

    }
}