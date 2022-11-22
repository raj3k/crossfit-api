import { UserDataSource } from '@/data/interfaces/data-sources/user-data-source';
import { MongooseModelWrapper } from '@/data/interfaces/data-sources/mongoose-model-wrapper';
import { User, ResponseUser } from '@/domain/models/user';

export class MongoDBUserDataSource implements UserDataSource {
    private db: MongooseModelWrapper;

    constructor (db: MongooseModelWrapper) {
        this.db = db
    }

    async create(user: User): Promise<ResponseUser> {
        const result = await this.db.create(user);
        return result;
    }
    async getOne(email: string): Promise<ResponseUser> {
        const result = await this.db.findOne({email: email})
        return result;
    }
}