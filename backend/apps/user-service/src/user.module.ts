import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../shared/database/src/database.module';
import { TokenModule } from '../../token-service/src/token.module';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { usersProviders } from './users.providers';


@Module({
    imports: [
        DatabaseModule,
        TokenModule,
    ],
    controllers: [UserController],
    providers: [
        UserService,
        ...usersProviders,
    ],
    exports: [UserService],
})
export class UserModule {}
