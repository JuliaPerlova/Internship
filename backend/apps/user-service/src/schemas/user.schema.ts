import * as mongoose from 'mongoose';
import { genderEnum } from '../enums/gender.enum';
import { rolesEnum } from '../enums/roles.enum';
import { statusEnum } from '../enums/status.enum';

export const UserSchema = new mongoose.Schema({
    login: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    gender: { type: String, enum: Object.values(genderEnum) },
    phone: { type: String, default: null },
    address: {
        country: { type: String, default: null },
        city: { type: String, default: null },
        addressLine1: { type: String, default: null },
        addressLine2: { type: String, default: null },
     },
    avatar: { type: String, default: null },
    avatarId: { type: String, default: null },
    status: { type: String, required: true, enum: Object.values(statusEnum) },
    role: { type: String, required: true, enum: Object.values(rolesEnum) },
    createdAt: { type: Date, default: new Date },
    timeZone: { type: String, default: 'Europe/Kiev' },
});