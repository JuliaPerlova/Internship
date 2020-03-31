import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern({ cmd: 'getAllUsers' })
    getAllUsers(): Promise<IUser[]> {
        return this.userService.getAllUsers();
    }

    @MessagePattern({ cmd: 'findUser' })
    findUser(userId: string): Promise<IUser> {
        return this.userService.findUser(userId);
    }

    @MessagePattern({ cmd: 'updateUser' })
    updateUser(userId: string, newData: CreateUserDto): Promise<IUser> {
        return this.userService.updateUser(userId, newData);
    }

    @MessagePattern({ cmd: 'deleteUser' })
    deleteUser(userId: string): Promise<IUser> {
        return this.userService.deleteUser(userId);
    }
}
