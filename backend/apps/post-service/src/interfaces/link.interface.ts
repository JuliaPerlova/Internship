import { Document } from 'mongoose';

export interface ILink extends Document {
    readonly provider: string,
    readonly link: string,
}