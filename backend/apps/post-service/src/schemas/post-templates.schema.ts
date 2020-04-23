import * as mongoose from 'mongoose';

export const PostTemplateSchema = new mongoose.Schema({
    provider: { type: String, required: true },
    title: { type: Boolean, required: true },
    attachments: { 
        image: { type: Boolean, required: true },
        video: { type: Boolean, required: true },
        maxAttachLength: { type: Number, required: true },
    },
    text: { type: Boolean, required: true },
    html: { type: Boolean, required: true },
    maxTextLength: { type: Number, required: true },
});