import { WorkoutResponseModel } from "@/domain/models/workout";

export interface GetOneWorkoutUseCase {
    execute(id: String): Promise<WorkoutResponseModel | null>;
}