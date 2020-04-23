import * as mongoose from 'mongoose';
import { statusEnum } from '../enums/status.enum';
import { ProvidersSchema } from './providers.schema';

export const ScheduleSchema = new mongoose.Schema({
    uId: { type: String, required: true, ref: 'User' },
    providers: { type: [ProvidersSchema], required: true },
    postId: { type: String, required: true, index: true, unique: true },
    notify: { type: Boolean },
    status: { type: String, required: true, enum: Object.values(statusEnum) },
});