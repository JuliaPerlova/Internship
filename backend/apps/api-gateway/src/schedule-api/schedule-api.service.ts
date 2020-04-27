import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';

@Injectable()
export class ScheduleApiService {
    private appClient: ClientProxy;

    constructor() {
        this.appClient = ClientProxyFactory.create({ 
            transport: Transport.TCP, 
            options: {
                host: 'localhost',
                port: 8030,
            },
        });
    }

    createSchedule(post: object, template: object, date: Date) {
        return this.appClient.send<string>({ cmd: 'create schedule' }, { post, template, date })
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN )});
    } 

    updateSchedule(scheduleId: string, newData: object) {
        return this.appClient.send<object>({ cmd: 'update schedule' }, { scheduleId, newData })
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    findOne(scheduleId: string) {
        return this.appClient.send<object>({ cmd: 'find one schedule' }, scheduleId)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    getUnpublished(uId: string) {
        return this.appClient.send<object>({ cmd: 'find unpublished schedule' }, uId)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    getAll(uId: string) {
        return this.appClient.send<object>({ cmd: 'find all schedules' }, uId)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }

    deleteOne(scheduleId: string) {
        return this.appClient.send<object>({ cmd: 'delete one schedule' }, scheduleId)
        .toPromise()
        .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    }
}