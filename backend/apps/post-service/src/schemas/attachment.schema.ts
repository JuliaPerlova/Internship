import * as mongoose from 'mongoose';
import { contentEnum } from '../enums/content.enum';

export const AttachmentSchema = new mongoose.Schema({
    link: { type: String, required: true },
    fileId: { type: String, required: true },
    contentType: { type: String, required: true, enum: Object.values(contentEnum) },
});

AttachmentSchema.index({ link: 1, fileId: 1 }, { unique: true });