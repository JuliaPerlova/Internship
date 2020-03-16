import * as mongoose from 'mongoose';

export const UserTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    uId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    expiredAt: { type: Date, required: true },
});

UserTokenSchema.index({ token: 1, uId: 1 }, { unique: true });