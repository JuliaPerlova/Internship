import * as mongoose from 'mongoose';

export const SocialSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, rquired: true },
    email: { type: String, required: true },
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
    userId: { type: String, default: null },
    avatar: { type: String, default: null },   
    accessToken: { type: String, required: true },
    expiredAt: { type: Date, required: true },
    createdAt: { type: Date, default: new Date },
});