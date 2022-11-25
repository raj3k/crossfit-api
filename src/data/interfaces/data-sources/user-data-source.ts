import { User, ResponseUser } from '@/domain/models/user';

export interface UserDataSource {
    create(user: User): Promise<ResponseUser>;
    getOneByEmail(email: string): Promise<ResponseUser>;
    getOneById(id: string): Promise<ResponseUser | null>;
}