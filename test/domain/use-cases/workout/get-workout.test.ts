import { WorkoutRequestModel, WorkoutResponseModel } from '../../../../src/domain/models/workout';
import { WorkoutRepository } from '../../../../src/domain/interfaces/repositories/workout-repository';
import { GetOneWorkout } from '../../../../src/domain/use-cases/workout/get-one-workout';


describe('Get One Workout Use Case', () => {

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

    let mockWorkoutRepository: WorkoutRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockWorkoutRepository = new MockWorkoutRepository();
    });

    test('should return data', async () => {
        const expectedResult = {
            id: "1",
            name: "Tommy V",
            mode: "For Time",
            equipment: [
                "barbell",
                "rope"
            ],
            exercises: [
                "21 thrusters",
                "12 rope climbs, 15 ft",
                "15 thrusters",
                "9 rope climbs, 15 ft",
                "9 thrusters",
                "6 rope climbs, 15 ft"
            ],
            trainerTips: [
                "Split the 21 thrusters as needed",
                "Try to do the 9 and 6 thrusters unbroken",
                "RX Weights: 115lb/75lb"
            ],
            createdAt: "4/20/2022, 2:21:56 PM",
            updatedAt: "4/20/2022, 2:21:56 PM"
        };

        jest.spyOn(mockWorkoutRepository, 'getWorkout').mockImplementation(() => Promise.resolve(expectedResult));

        const getWorkoutUseCase = new GetOneWorkout(mockWorkoutRepository);
        const result = await getWorkoutUseCase.execute("1");
        expect(result).toStrictEqual(expectedResult);
    });
});