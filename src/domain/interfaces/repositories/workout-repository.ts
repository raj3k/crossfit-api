import { WorkoutRequestModel, WorkoutResponseModel } from "@/domain/models/workout";

export interface WorkoutRepository {
    createWorkout(contact: WorkoutRequestModel): void;
    deleteWorkout(id: String): void;
    updateWorkout(id: String, data: WorkoutRequestModel): void;
    getWorkouts(): Promise<WorkoutResponseModel[]>;
    getWorkout(id: String): Promise<WorkoutResponseModel | null>;
}