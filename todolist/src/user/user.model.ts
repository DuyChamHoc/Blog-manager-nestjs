import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })
export interface User extends Document {
    username: String;
    email: String;
    password: String;
}