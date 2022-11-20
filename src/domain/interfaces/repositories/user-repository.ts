import { User } from '@/domain/models/user';

export interface UserRepository {
    createUser(user: User): Promise<User>;
    getUser(email: string): Promise<User>;
}