import { WorkoutDataSource } from '../../../src/data/interfaces/data-sources/workout-data-source';
import { WorkoutRepository } from '../../../src/domain/interfaces/repositories/workout-repository';
import { WorkoutRequestModel, WorkoutResponseModel } from '../../../src/domain/models/workout';
import { WorkoutRepositoryImpl } from '../../../src/domain/repositories/workout-repository';

class MockWorkoutDataSource implements WorkoutDataSource {
    create(workout: WorkoutRequestModel): Promise<WorkoutResponseModel> {
        throw new Error('Method not implemented.');
    }
    getAll(): Promise<WorkoutResponseModel[]> {
        throw new Error('Method not implemented.');
    }
    getOne(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    updateOne(id: string, data: WorkoutRequestModel): Promise<any> {
        throw new Error('Method not implemented.');
    }
    deleteOne(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

describe('Workout Repository', () => {
    let mockWorkoutDataSource: MockWorkoutDataSource;
    let workoutRepository: WorkoutRepository;

    const inputData = {
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
        ]
    }

    const expectedData = {
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
    }

    beforeEach(() => {
        jest.clearAllMocks();
        mockWorkoutDataSource = new MockWorkoutDataSource();
        workoutRepository = new WorkoutRepositoryImpl(mockWorkoutDataSource);
    });

    describe('Get all workouts', () => {
        test('should return data', async () => {

            jest.spyOn(mockWorkoutDataSource, 'getAll').mockImplementation(() => Promise.resolve([expectedData]));

            const result = await workoutRepository.getWorkouts();
            expect(result).toStrictEqual([expectedData]);
        });
    });

    describe('Get one workout', () => {
        test('should return data', async () => {
        
            jest.spyOn(mockWorkoutDataSource, 'getOne').mockImplementation(() => Promise.resolve(expectedData));

            const result = await workoutRepository.getWorkout("1");
            expect(result).toStrictEqual(expectedData);
        });
    });

    describe('Create one workout', () => {
        test('should create workout and return it', async () => {
            jest.spyOn(mockWorkoutDataSource, 'create').mockImplementation(() => Promise.resolve(expectedData));
    
            const result = await workoutRepository.createWorkout(inputData);
            expect(result).toStrictEqual(expectedData);
        });
    });

    describe('Update one workout', () => {
        test('should update workout and return in', async () => {
            const inputToUpdate = {
                name: "Tommy V Updated",
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

            const updatedData = {
                id: "1",
                name: "Tommy V Updated",
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
            }

            jest.spyOn(mockWorkoutDataSource, 'updateOne').mockImplementation(() => Promise.resolve(updatedData));

            const result = await workoutRepository.updateWorkout("1", inputToUpdate);
            expect(result).toStrictEqual(updatedData);
        });
    });

    describe('Delete one workout', () => {
        test('should delete workout', async () => {
            jest.spyOn(mockWorkoutDataSource, 'deleteOne').mockImplementation(() => Promise.resolve());

            await workoutRepository.deleteWorkout("1");
            expect(mockWorkoutDataSource.deleteOne).toBeCalledTimes(1);
        });
    });
})