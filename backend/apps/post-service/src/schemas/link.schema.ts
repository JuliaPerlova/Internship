import * as mongoose from 'mongoose';

export const LinkSchema = new mongoose.Schema({
    provider: { type: String, required: true },
    link: { type: String, required: true },
})