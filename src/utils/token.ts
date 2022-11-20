import jwt from 'jsonwebtoken';
import { User } from '@/domain/models/user';

export const generateAccessToken = (user: User): string => {
    return jwt.sign({id: user._id}, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '1d',
    });
}

export default { generateAccessToken };