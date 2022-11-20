import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User extends Document {
    _id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    email: string,
    password: string

    isValidPassword(password: string): Promise<Error | boolean>
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

userSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;

    next();
});

userSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model<User>('User', userSchema);