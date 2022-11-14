import { WorkoutRequestModel, WorkoutResponseModel } from "@/domain/models/workout";

export interface UpdateWorkoutUseCase {
    execute(id: String, data: WorkoutRequestModel): Promise<WorkoutResponseModel | null>;
}