import { Document } from 'mongoose';
import { IPostBody } from './body-post.interface';

export interface IPost extends Document {
    readonly providerId: string,
    readonly uId: string,
    readonly title: string,
    readonly body: IPostBody,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly templateId: string,
    readonly _id: string,
}