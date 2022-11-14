import { WorkoutRequestModel, WorkoutResponseModel } from '@/domain/models/workout';
import { WorkoutRepository } from '@/domain/interfaces/repositories/workout-repository';
import { CreateWorkoutUseCase } from '@/domain/interfaces/use-cases/workout/create-workout-use-case';

export class CreateWorkout implements CreateWorkoutUseCase {
    private workoutRepository: WorkoutRepository

    constructor(workoutRespository: WorkoutRepository) {
        this.workoutRepository = workoutRespository;
    }

    async execute(workout: WorkoutRequestModel): Promise<WorkoutResponseModel | null> {
        const result = await this.workoutRepository.createWorkout(workout);
        return result;
    }
}