import { WorkoutDataSource } from '@/data/interfaces/data-sources/workout-data-source';
import { WorkoutRequestModel, WorkoutResponseModel } from '@/domain/models/workout';
import { MongooseWrokoutModelWrapper } from '@/data/interfaces/data-sources/mongoose-workout-model-wrapper';

export class MongoDBWorkoutDataSource implements WorkoutDataSource {
    
    private db: MongooseWrokoutModelWrapper;

    constructor (db: MongooseWrokoutModelWrapper) {
        this.db = db;
    }

    async getAll(): Promise<WorkoutResponseModel[]> {
        const result = await this.db.find();
        return result
    }

    async getOne(id: string): Promise<WorkoutResponseModel | null> {
        const result = await this.db.findById(id);
        return result;
    }
    
    async create(workout: WorkoutRequestModel): Promise<WorkoutResponseModel> {
        const result = await this.db.create(workout);
        return result;
    }
    
    async updateOne(id: string, data: WorkoutRequestModel): Promise<WorkoutResponseModel | null> {
        let result = await this.db.findByIdAndUpdate(id, data, {new: true});
        return result;
    }
    
    async deleteOne(id: string): Promise<void> {
        await this.db.findByIdAndDelete(id);
    }
}