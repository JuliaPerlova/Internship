import * as mongoose from 'mongoose';

export const ProvidersSchema = new mongoose.Schema({
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
});