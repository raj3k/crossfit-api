import { User, ResponseUser } from '@/domain/models/user';

export interface UserDataSource {
    create(user: User): Promise<ResponseUser>;
    getOne(email: string): Promise<ResponseUser>;
}