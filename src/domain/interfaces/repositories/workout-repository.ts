import { WorkoutRequestModel, WorkoutResponseModel } from "@/domain/models/workout";

export interface WorkoutRepository {
    createWorkout(workout: WorkoutRequestModel): Promise<WorkoutResponseModel | null>;
    deleteWorkout(id: string): Promise<void>;
    updateWorkout(id: string, data: WorkoutRequestModel): Promise<WorkoutResponseModel | null>;
    getWorkouts(): Promise<WorkoutResponseModel[]>;
    getWorkout(id: string): Promise<WorkoutResponseModel | null>;
}