import * as mongoose from 'mongoose';
import { genderEnum } from '../enums/gender.enum';
import { rolesEnum } from '../enums/roles.enum';
import { generate } from 'shortid';

export const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true, enum: Object.values(genderEnum) },
    phone: { type: String, default: null },
    address: {
        country: { type: String, default: null },
        city: { type: String, default: null },
        addressLine1: { type: String, default: null },
        addressLine2: { type: String, default: null },
     },
    avatar: { type: String, default: null },
    avatarId: { type: String, default: null },
    role: { type: String, required: true, enum: Object.values(rolesEnum) },
    createdAt: { type: Date, default: Date.now },
    _id: { type: String, default: generate },
});

UserSchema.index({ email: 1 }, { unique: true });