import { WorkoutRequestModel, WorkoutResponseModel } from '@/domain/models/workout';

export interface WorkoutDataSource {
    create(workout: WorkoutRequestModel): Promise<WorkoutResponseModel>;
    getAll(): Promise<WorkoutResponseModel[]>;
    getOne(id: string): Promise<WorkoutResponseModel | null>;
    updateOne(id: string, data: WorkoutRequestModel): Promise<WorkoutResponseModel | null>;
    deleteOne(id: string): Promise<void>;
}