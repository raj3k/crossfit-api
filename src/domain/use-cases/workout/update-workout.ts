import { WorkoutRequestModel, WorkoutResponseModel } from '@/domain/models/workout';
import { WorkoutRepository } from '@/domain/interfaces/repositories/workout-repository';
import { UpdateWorkoutUseCase } from '@/domain/interfaces/use-cases/workout/update-workout-use-case';

export class UpdateWorkout implements UpdateWorkoutUseCase {
    workoutRepository: WorkoutRepository

    constructor(workoutRepository: WorkoutRepository) {
        this.workoutRepository = workoutRepository;
    }
    
    execute(id: String, data: WorkoutRequestModel): Promise<WorkoutResponseModel | null> {
        const result = this.workoutRepository.updateWorkout(id, data);
        return result;
    }
}