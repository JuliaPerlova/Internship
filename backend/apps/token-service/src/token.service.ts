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

    async exists(uId: string, token: string): Promise<boolean> {
        return await this.userTokenModel.exists({ uId, token });
    }

    async find(uId: string, token: string): Promise<IUserToken> {
        return await this.userTokenModel.findOne({ uId }, { token });
    }

    async delete(uId: string, token: string): Promise<{ ok?: number, n?: number }> {
        return await this.userTokenModel.deleteOne({ uId, token });
    }

    async deleteAll(uId: string): Promise<{ ok?: number, n?: number }> {
        return await this.userTokenModel.deleteMany({ uId });
    }
}