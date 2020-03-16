import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserServiceService {
    constructor(@Inject('USER_MODEL') private readonly usersModel: Model<IUser>) {}

    async createUser(createUserDto: CreateUserDto, role: Array<string>): Promise<IUser> {
        const createdUser = new this.usersModel({ ...createUserDto, role });
        return await createdUser.save();
    }

    async getAllUsers(): Promise<IUser[]> {
        return await this.usersModel.find().exec();
    }

    async findUser(userId: string): Promise<IUser> {
        return await this.usersModel.findById(userId).exec();
    }

    async updateUser(userId: string, newData: CreateUserDto): Promise<IUser> {
        return await this.usersModel.findByIdAndUpdate(userId, newData, { new: true }).exec();
    }

    async deleteUser(userId: string): Promise<IUser> {
        return await this.usersModel.findByIdAndRemove(userId).exec();
    }

}
