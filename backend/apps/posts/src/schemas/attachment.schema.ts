import * as mongoose from 'mongoose';

export const AttachmentSchema = new mongoose.Schema({
    postId: { type: mongoose.Types.ObjectId, required: true, ref: 'Post' },
    link: { type: String, required: true },
    fileId: { type: String, required: true },
    contentType: { type: String, required: true },
    createdAt: { type: Date, default: new Date },
});

AttachmentSchema.index({ link: 1, fileId: 1, postId: 1 }, { unique: true });