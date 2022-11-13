import { WorkoutRequestModel, WorkoutResponseModel } from "@/domain/models/workout";

export interface CreateWorkoutUseCase {
    execute(workout: WorkoutRequestModel): Promise<WorkoutResponseModel | null>;
}