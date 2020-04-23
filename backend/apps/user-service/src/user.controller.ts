import { Controller, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthGuard } from '../../shared/guards/auth.guard';

import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern({ cmd: 'get all users' })
    getAllUsers(): Promise<IUser[]> {
        return this.userService.getAllUsers();
    }

    @MessagePattern({ cmd: 'find user' })
    findUser({ uId }): Promise<IUser> {
        return this.userService.findUser(uId);
    }

    @MessagePattern({ cmd: 'update user' })
    @UsePipes(ValidationPipe)
    updateUser({ uId, data }: { uId: string, data: CreateUserDto }): Promise<IUser> {
        return this.userService.updateUser(uId, data);
    }

    @MessagePattern({ cmd: 'delete user' })
    deleteUser({ uId }): Promise<IUser> {
        return this.userService.deleteUser(uId);
    }
}
