import { Document } from 'mongoose';

export interface IAttachment extends Document {
    readonly link: string,
    readonly fileId: string,
    readonly contentType: string,
}