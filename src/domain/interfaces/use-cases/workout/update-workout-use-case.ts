import { WorkoutRequestModel } from "@/domain/models/workout";

export interface UpdateWorkoutUseCase {
    execute(id: String, data: WorkoutRequestModel): void;
}