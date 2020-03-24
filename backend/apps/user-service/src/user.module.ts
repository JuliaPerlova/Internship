import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/src/database.module';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { usersProviders } from './users.providers';


@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
        UserService,
        ...usersProviders,
    ],
    exports: [UserService],
})
export class UserModule {}
