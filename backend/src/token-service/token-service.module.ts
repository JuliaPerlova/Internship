import { Module } from '@nestjs/common';
import { tokensProviders } from './token.providers';
import { TokenServiceService } from './token-service.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [TokenServiceService],
    providers: [
        TokenServiceService,
        ...tokensProviders,
    ],
})
export class TokenServiceModule {}
