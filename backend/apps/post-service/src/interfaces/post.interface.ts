import { Document } from 'mongoose';

import { IPostBody } from './body-post.interface';
import { IProviders } from './providers.interface';
import { ILink } from './link.interface';

export interface IPost extends Document {
    readonly providers: IProviders[],
    readonly uId: string,
    readonly title: string,
    readonly body: IPostBody,
    readonly links: ILink[],
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly templateId: string,
    readonly _id: string,
}