import { Module } from '@nestjs/common';
import { MailServiceService } from './mail-service.service';

@Module({
    providers: [MailServiceService],
    controllers: [],
    exports: [MailServiceService],
})
export class MailServiceModule {}
