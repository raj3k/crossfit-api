import { UserDataSource } from '@/data/interfaces/data-sources/user-data-source';
import { UserRepository } from '@/domain/interfaces/repositories/user-repository';
import { User, ResponseUser } from '@/domain/models/user';

export class UserRepositoryImpl implements UserRepository {
    private userDataSource: UserDataSource

    constructor (userDataSource: UserDataSource) {
        this.userDataSource = userDataSource;
    }
    async getUserById(id: string): Promise<ResponseUser | null> {
        const result = await this.userDataSource.getOneById(id);
        return result;
    }
    
    async createUser(user: User): Promise<ResponseUser> {
        const result = await this.userDataSource.create(user);
        return result;
    }

    async getUserByEmail(email: string): Promise<ResponseUser | null> {
        const result = await this.userDataSource.getOneByEmail(email);
        return result;
    }

}