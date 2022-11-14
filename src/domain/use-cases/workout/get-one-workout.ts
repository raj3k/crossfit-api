import { WorkoutResponseModel } from '@/domain/models/workout';
import { WorkoutRepository } from '@/domain/interfaces/repositories/workout-repository';
import { GetOneWorkoutUseCase } from '@/domain/interfaces/use-cases/workout/get-one-workout-use-case';

export class GetOneWorkout implements GetOneWorkoutUseCase {
    workoutRepository: WorkoutRepository

    constructor(workoutRespository: WorkoutRepository) {
        this.workoutRepository = workoutRespository;
    }
    
    async execute(id: string): Promise<WorkoutResponseModel | null> {
        const result = await this.workoutRepository.getWorkout(id);
        return result;
    }
}