import { Document } from 'mongoose';

export interface ISocial extends Document {
    readonly provider: string,
    readonly providerId: string,
    readonly userId: string,
    readonly email: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly avatar: string,
    readonly accessToken: string,
    readonly expiredAt: Date,
    readonly createdAt: Date,
    readonly _id: string;
};