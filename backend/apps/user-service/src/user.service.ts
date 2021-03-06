import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@Inject('USER_MODEL') private userModel: Model<IUser>) {}

    private async hashPass(password: string) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async createUser(createUserDto: CreateUserDto, role: string, status: string): Promise<IUser> {
        const password = await this.hashPass(createUserDto.password);
        const createdUser = new this.userModel({ ...createUserDto, password, role, status });
        return await createdUser.save();
    }

    async getAllUsers(): Promise<IUser[]> {
        return await this.userModel.find().exec();
    }

    async findUserByLogin(login: string): Promise<IUser> {
        return await this.userModel.findOne({ login }).exec();
    }

    async findUserByEmail(email: string): Promise<IUser> {
        return await this.userModel.findOne({ email }).exec();
    }

    async findUser(userId: string): Promise<IUser> {
        return await this.userModel.findById(userId).exec();
    }

    async updateUser(userId: string, newData: any): Promise<IUser> {
        if (newData.password) {
            newData.password = await this.hashPass(newData.password);
        }
        return await this.userModel.findByIdAndUpdate(userId, newData, { new: true }).exec();
    }

    async deleteUser(userId: string): Promise<IUser> {
        return await this.userModel.findByIdAndRemove(userId).exec();
    }
}
