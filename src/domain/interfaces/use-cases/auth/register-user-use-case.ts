import { User } from '@/domain/models/user';

export interface RegisterUserUseCase {
    execute(user: User): Promise<string | null>;
}