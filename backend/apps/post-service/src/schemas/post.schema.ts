import * as mongoose from 'mongoose';

import { AttachmentSchema } from './attachment.schema';
import { ProvidersSchema } from './providers.schema';
import { LinkSchema } from './link.schema';

export const PostSchema = new mongoose.Schema({
    providers: { type: [ProvidersSchema], required: true },
    uId: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    title: { type: String, default: null },
    body: { 
        text: { type: String, required: true },
        attachments: { type: [AttachmentSchema], default: null },
    },
    links: { type: [LinkSchema], default: [] },
    createdAt: { type: Date, default: new Date },
    updatedAt: { type: Date, default: null },
    templateId: { type: mongoose.Types.ObjectId, required: true, ref: 'Template' },
});

PostSchema.index({ templateId: 1 }, { unique: true });