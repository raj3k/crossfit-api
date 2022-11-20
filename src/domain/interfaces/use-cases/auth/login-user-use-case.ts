import { User } from '@/domain/models/user';

export interface LoginUserUseCase {
    execute(userCredentials: Pick<User, 'email' | 'password'>): Promise<string | null>;
}