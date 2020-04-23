import { Document } from 'mongoose';
import { IProviders } from './providers.interface';

export interface ISchedule extends Document {
    readonly uId: string,
    readonly providers: IProviders[],
    readonly postId: string,
    readonly notify: boolean,
    readonly status: string,
}