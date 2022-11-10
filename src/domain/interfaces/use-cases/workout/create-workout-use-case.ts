import { WorkoutRequestModel } from "@/domain/models/workout";

export interface CreateWorkoutUseCase {
    execute(contact: WorkoutRequestModel): void;
}