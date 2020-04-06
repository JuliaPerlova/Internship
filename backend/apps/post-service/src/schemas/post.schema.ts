import * as mongoose from 'mongoose';

import { AttachmentSchema } from './attachment.schema';
import { textEnum } from '../enums/text.enum';

export const PostSchema = new mongoose.Schema({
    providerId: { type: mongoose.Types.ObjectId, required: true },
    uId: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    title: { type: String, required: true },
    body: { 
        text: { type: String, required: true, enum: Object.values(textEnum) },
        attachments: { type: [AttachmentSchema], default: null },
    },
    createdAt: { type: Date, default: new Date },
    updatedAt: { type: Date, default: null },
});

PostSchema.index({ uId: 1 }, { unique: true });