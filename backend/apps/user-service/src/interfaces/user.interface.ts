import { Document } from 'mongoose';
import { IAddress } from './address.interface';

export interface IUser extends Document {
    readonly email: string;
    readonly password: string;
    readonly login: string;
    readonly gender: string;
    readonly avatar: string;
    readonly avatarId: string;
    readonly address: IAddress;
    readonly phone: string;
    readonly role: string;
    readonly status: string;
    readonly createdAt: Date;
    readonly _id: string;
}