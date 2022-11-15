import { WorkoutDataSource } from './../../data/interfaces/data-sources/workout-data-source';
import { WorkoutRequestModel, WorkoutResponseModel } from '../models/workout';
import { WorkoutRepository } from '../interfaces/repositories/workout-repository';

class WorkoutRepositoryImpl implements WorkoutRepository {
    private workoutDataSource: WorkoutDataSource

    constructor (workoutDataSource: WorkoutDataSource) {
        this.workoutDataSource = workoutDataSource;
    }

    async getWorkouts(): Promise<WorkoutResponseModel[]> {
        const result = await this.workoutDataSource.getAll();
        return result;
    }

    async getWorkout(id: string): Promise<WorkoutResponseModel | null> {
        const result = await this.workoutDataSource.getOne(id);
        return result;
    }

    async createWorkout(workout: WorkoutRequestModel): Promise<WorkoutResponseModel | null> {
        const result = await this.workoutDataSource.create(workout);
        return result;
    }

    async updateWorkout(id: string, data: WorkoutRequestModel): Promise<WorkoutResponseModel | null> {
        const result = await this.workoutDataSource.updateOne(id, data);
        return result;
    }

    async deleteWorkout(id: string): Promise<void> {
        await this.workoutDataSource.deleteOne(id);
    }
}

export { WorkoutRepositoryImpl };