import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/src/database.module';

import { TokenService } from './token.service';
import { tokensProviders } from './token.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [TokenService],
    providers: [
        TokenService,
        ...tokensProviders,
    ],
    exports: [TokenService],
})
export class TokenModule {}
