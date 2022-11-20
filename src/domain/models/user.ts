import mongoose from 'mongoose';

export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    email: string,
    password: string
}

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        dateOfBirth: { type: String },
        email: { type: String, required: true, index: true },
        hashedPassowrd: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export const UserModel = mongoose.model<User>('User', userSchema);