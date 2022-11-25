import { User, ResponseUser } from '@/domain/models/user';

export interface UserRepository {
    createUser(user: User): Promise<ResponseUser>;
    getUserByEmail(email: string): Promise<ResponseUser | null>;
    getUserById(id: string): Promise<ResponseUser | null>;
}