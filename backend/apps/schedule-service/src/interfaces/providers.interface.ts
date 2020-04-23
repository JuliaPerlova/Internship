import { Document } from 'mongoose';

export interface IProviders extends Document {
    readonly provider: string,
    readonly providerId: string,
}