import { WorkoutRequestModel, WorkoutResponseModel } from '../../../../src/domain/models/workout';
import { DeleteWorkout } from './../../../../src/domain/use-cases/workout/delete-workout';
import { WorkoutRepository } from '../../../../src/domain/interfaces/repositories/workout-repository';

describe('Delete Workout Use Case', () => {

    class MockWorkoutRepository implements WorkoutRepository {
        createWorkout(workout: WorkoutRequestModel): Promise<WorkoutResponseModel | null> {
            throw new Error('Method not implemented.');
        }
        deleteWorkout(id: string): Promise<void> {
            throw new Error('Method not implemented.');
        }
        updateWorkout(id: string, data: WorkoutRequestModel): Promise<WorkoutResponseModel | null> {
            throw new Error('Method not implemented.');
        }
        getWorkouts(): Promise<WorkoutResponseModel[]> {
            throw new Error('Method not implemented.');
        }
        getWorkout(id: string): Promise<WorkoutResponseModel | null> {
            throw new Error('Method not implemented.');
        }
    }

    let mockWorkoutRepository: MockWorkoutRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockWorkoutRepository = new MockWorkoutRepository();
    });

    test('should make deleteWorkout call on workout repo', async () => {
        jest.spyOn(mockWorkoutRepository, 'deleteWorkout').mockImplementation(() => Promise.resolve());

        const deleteWorkoutUseCase = new DeleteWorkout(mockWorkoutRepository);
        await deleteWorkoutUseCase.execute("1");
        expect(mockWorkoutRepository.deleteWorkout).toBeCalledTimes(1);
    });
});