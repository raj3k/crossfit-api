import { User, ResponseUser } from '@/domain/models/user';

export interface UserRepository {
    createUser(user: User): Promise<ResponseUser>;
    getUser(email: string): Promise<ResponseUser | null>;
}