import * as mongoose from 'mongoose';

import { AttachmentSchema } from './attachment.schema';

export const PostSchema = new mongoose.Schema({
    providerId: { type: String, required: true },
    uId: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    title: { type: String, default: null },
    body: { 
        text: { type: String, required: true },
        attachments: { type: [AttachmentSchema], default: null },
    },
    createdAt: { type: Date, default: new Date },
    updatedAt: { type: Date, default: null },
    templateId: { type: mongoose.Types.ObjectId, required: true, ref: 'Template' },
});

PostSchema.index({ uId: 1, templateId: 1 }, { unique: true });