import { Schema, Document } from 'mongoose';
import { User } from 'src/user/user.model';

export const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ['Pending', 'Inprogress', 'Completed'],
        required: true,
    },

    time: {
        type: String,
        required: true,
    }, 

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true })
export interface Todo extends Document {
    title: String;
    description: String;
    status: String;
    time: String;
    user: User;
}