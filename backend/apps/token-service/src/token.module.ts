import { Module, Global } from '@nestjs/common';

import { DatabaseModule } from '../../shared/database/src/database.module';

import { TokenService } from './token.service';
import { tokensProviders } from './token.providers';

@Global()
@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
        TokenService,
        ...tokensProviders,
    ],
    exports: [TokenService],
})
export class TokenModule {}
