import { WorkoutRequestModel } from "@/domain/models/workout";

export interface CreateWorkoutUseCase {
    execute(workout: WorkoutRequestModel): void;
}