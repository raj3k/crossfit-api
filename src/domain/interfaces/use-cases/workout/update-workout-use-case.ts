import { WorkoutRequestModel, WorkoutResponseModel } from "@/domain/models/workout";

export interface UpdateWorkoutUseCase {
    execute(id: string, data: WorkoutRequestModel): Promise<WorkoutResponseModel | null>;
}