import { WorkoutRequestModel, WorkoutResponseModel } from "@/domain/models/workout";

export interface WorkoutRepository {
    createWorkout(workout: WorkoutRequestModel): Promise<WorkoutResponseModel | null>;
    deleteWorkout(id: String): Promise<void>;
    updateWorkout(id: String, data: WorkoutRequestModel): Promise<WorkoutResponseModel | null>;
    getWorkouts(): Promise<WorkoutResponseModel[]>;
    getWorkout(id: String): Promise<WorkoutResponseModel | null>;
}