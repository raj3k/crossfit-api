import { UserDataSource } from '@/data/interfaces/data-sources/user-data-source';
import { MongooseModelWrapper } from '@/data/interfaces/data-sources/mongoose-model-wrapper';
import { User, ResponseUser } from '@/domain/models/user';

export class MongoDBUserDataSource implements UserDataSource {
    private db: MongooseModelWrapper;

    constructor (db: MongooseModelWrapper) {
        this.db = db
    }
    async getOneByEmail(email: string): Promise<ResponseUser> {
        const result = await this.db.findOne({email: email})
        return result;
    }

    async getOneById(id: string): Promise<ResponseUser | null> {
        const result = await this.db.findOne({_id: id}).select('-password');
        return result;
    }

    async create(user: User): Promise<ResponseUser> {
        const result = await this.db.create(user);
        return result;
    }
}