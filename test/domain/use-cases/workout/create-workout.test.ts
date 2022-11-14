import { WorkoutRequestModel, WorkoutResponseModel } from '../../../../src/domain/models/workout';
import { WorkoutRepository } from '../../../../src/domain/interfaces/repositories/workout-repository';
import { CreateWorkout } from '../../../../src/domain/use-cases/workout/create-workout';

describe('Create Workout Use Case', () => {
    
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

    test('should make deleteWorkout call on workout repo and return newly created workout', async () => {
        const inputData = {
            name: "Tommy V updated",
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
            ]
        }

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
        
        jest.spyOn(mockWorkoutRepository, 'createWorkout').mockImplementation(() => Promise.resolve(expectedResult));

        const createWorkoutUseCase = new CreateWorkout(mockWorkoutRepository);
        const result = await createWorkoutUseCase.execute(inputData);

        expect(mockWorkoutRepository.createWorkout).toBeCalledTimes(1);
        expect(result).toStrictEqual(expectedResult);
    });
})