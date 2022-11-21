import { UserDataSource } from '@/data/interfaces/data-sources/user-data-source';
import { UserRepository } from '@/domain/interfaces/repositories/user-repository';
import { User, ResponseUser } from '@/domain/models/user';

export class UserRepositoryImpl implements UserRepository {
    private userDataSource: UserDataSource

    constructor (userDataSource: UserDataSource) {
        this.userDataSource = userDataSource;
    }
    
    async createUser(user: User): Promise<ResponseUser> {
        const result = await this.userDataSource.create(user);
        return result;
    }

    async getUser(email: string): Promise<ResponseUser | null> {
        const result = await this.userDataSource.getOne(email);
        return result;
    }

}