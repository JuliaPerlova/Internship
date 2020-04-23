import { Document } from 'mongoose';
import { IAttachment } from './attachment.interface';

export interface IPostBody extends Document {
    readonly text: string,
    readonly attachments: Array<IAttachment>,
}