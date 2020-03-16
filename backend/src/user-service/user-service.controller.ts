import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserServiceService } from './user-service.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';

@Controller('user-service')
export class UserServiceController {
    constructor(private readonly userService: UserServiceService) {}

    @MessagePattern({ cmd: 'createUser' })
    createUser(createUserDto: CreateUserDto, role: Array<string>): Promise<IUser> {
        return this.userService.createUser(createUserDto, role);
    }

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
