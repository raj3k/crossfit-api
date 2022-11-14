import { WorkoutResponseModel } from "@/domain/models/workout";

export interface GetOneWorkoutUseCase {
    execute(id: string): Promise<WorkoutResponseModel | null>;
}