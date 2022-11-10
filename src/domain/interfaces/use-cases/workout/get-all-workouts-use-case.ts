import { WorkoutResponseModel } from "@/domain/models/workout";

export interface GetAllWorkoutsUseCase {
    execute(): Promise<WorkoutResponseModel[]>;
}