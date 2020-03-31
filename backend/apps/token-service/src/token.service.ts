import { Injectable, Inject } from '@nestjs/common';

import { Model } from 'mongoose';

import { IUserToken } from './interfaces/user-token.interface';
import { CreateUserTokenDto } from './dto/create-user-token.dto';


@Injectable()
export class TokenService {
    constructor(@Inject('USERTOKEN_MODEL') private readonly userTokenModel: Model<IUserToken>) {}

    async create(createUserTokenDto: CreateUserTokenDto): Promise<IUserToken> {
        const userToken = new this.userTokenModel(createUserTokenDto);
        return await userToken.save();
    }

    async exists(token: string): Promise<boolean> {
        return await this.userTokenModel.exists({ token });
    }

    async find(token: string): Promise<IUserToken> {
        return await this.userTokenModel.findOne({ token });
    }

    async delete(token: string): Promise<{ ok?: number, n?: number }> {
        return await this.userTokenModel.deleteOne({ token });
    }

    async deleteAll(uId: string): Promise<{ ok?: number, n?: number }> {
        return await this.userTokenModel.deleteMany({ uId });
    }
}