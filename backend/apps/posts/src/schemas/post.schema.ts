import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
    uId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    body: { 
        text: { type: String, required: true },
        attachments: { type: Array, default: null },
    },
    createdAt: { type: Date, default: new Date },
    updatedAt: { type: Date, default: null },
});

PostSchema.index({ uId: 1 }, { unique: true });