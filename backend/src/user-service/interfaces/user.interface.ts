import { Document } from 'mongoose';
import { IAddress } from './address.interface';

export interface IUser extends Document {
    readonly email: string;
    readonly password: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly gender: string;
    readonly avatar: string;
    readonly avatarId: string;
    readonly address: IAddress;
    readonly phone: string;
    readonly role: Array<string>;
    readonly createdAt: Date;
}