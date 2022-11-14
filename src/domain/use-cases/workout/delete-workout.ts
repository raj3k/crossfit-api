import { WorkoutRepository } from '@/domain/interfaces/repositories/workout-repository';
import { DeleteWorkoutUseCase } from '@/domain/interfaces/use-cases/workout/delete-workout-use-case';

export class DeleteWorkout implements DeleteWorkoutUseCase {
    workoutRepository: WorkoutRepository

    constructor(workoutRepository: WorkoutRepository) {
        this.workoutRepository = workoutRepository;
    }
    
    async execute(id: string): Promise<void> {
        await this.workoutRepository.deleteWorkout(id);
    }
}