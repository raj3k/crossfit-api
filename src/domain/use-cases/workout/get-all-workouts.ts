import { WorkoutResponseModel } from '@/domain/models/workout';
import { WorkoutRepository } from '@/domain/interfaces/repositories/workout-repository';
import { GetAllWorkoutsUseCase } from '@/domain/interfaces/use-cases/workout/get-all-workouts-use-case';

export class GetAllWorkouts implements GetAllWorkoutsUseCase {
    workoutRepository: WorkoutRepository;
    
    constructor(workoutRepository: WorkoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    async execute(): Promise<WorkoutResponseModel[]> {
        const result = await this.workoutRepository.getWorkouts();
        return result;
    }
}
