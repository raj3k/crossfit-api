import request from 'supertest';
import { WorkoutRequestModel, WorkoutResponseModel } from '../../../src/domain/models/workout';
import { GetAllWorkoutsUseCase } from '../../../src/domain/interfaces/use-cases/workout/get-all-workouts-use-case';
import { GetOneWorkoutUseCase } from '../../../src/domain/interfaces/use-cases/workout/get-one-workout-use-case';
import { CreateWorkoutUseCase } from '../../../src/domain/interfaces/use-cases/workout/create-workout-use-case';
import { UpdateWorkoutUseCase } from '../../../src/domain/interfaces/use-cases/workout/update-workout-use-case';
import { DeleteWorkoutUseCase } from '../../../src/domain/interfaces/use-cases/workout/delete-workout-use-case';
import { WorkoutsRouter } from '../../../src/presentation/routers/workout-router';
import server from '../../../src/server';

class MockGetAllWorkoutsUseCase implements GetAllWorkoutsUseCase {
    execute(): Promise<WorkoutResponseModel[]> {
        throw new Error('Method not implemented.');
    }
}

class MockGetOneWorkoutUseCase implements GetOneWorkoutUseCase {
    execute(id: String): Promise<any> {
        throw new Error('Method not implemented.');
    }
}

class MockCreateWorkoutUseCase implements CreateWorkoutUseCase {
    execute(workout: WorkoutRequestModel): Promise<any> {
        throw new Error('Method not implemented.');
    }

}

class MockUpdateWorkoutUseCase implements UpdateWorkoutUseCase {
    execute(id: String, data: WorkoutRequestModel): Promise<WorkoutResponseModel | null> {
        throw new Error('Method not implemented.');
    }
}

class MockDeleteWorkoutUseCase implements DeleteWorkoutUseCase {
    execute(id: String): void {
        throw new Error('Method not implemented.');
    }
}

describe('Workout Router', () => {
    let mockGetAllWorkoutsUseCase: MockGetAllWorkoutsUseCase;
    let mockGetOneWorkoutUseCase: MockGetOneWorkoutUseCase;
    let mockCreateWorkoutUseCase: MockCreateWorkoutUseCase;
    let mockUpdateWorkoutUseCase: MockUpdateWorkoutUseCase;
    let mockDeleteWorkoutUseCase: MockDeleteWorkoutUseCase;

    beforeAll(() => {
        mockGetAllWorkoutsUseCase = new MockGetAllWorkoutsUseCase;
        mockGetOneWorkoutUseCase = new MockGetOneWorkoutUseCase;
        mockCreateWorkoutUseCase = new MockCreateWorkoutUseCase;
        mockUpdateWorkoutUseCase = new MockUpdateWorkoutUseCase;
        mockDeleteWorkoutUseCase = new MockDeleteWorkoutUseCase;
        server.use('/api/workouts', WorkoutsRouter(mockGetAllWorkoutsUseCase, mockGetOneWorkoutUseCase, mockCreateWorkoutUseCase, mockUpdateWorkoutUseCase, mockDeleteWorkoutUseCase))
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/workouts', () => {
        test('should return 200 with data', async () => {
            const expectedData = [{
                _id: "6375143efefbca103232f1ff",
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
            }]

            jest.spyOn(mockGetAllWorkoutsUseCase, "execute").mockImplementation(() => Promise.resolve(expectedData));

            const response = await request(server).get('/api/workouts');

            expect(response.status).toBe(200);
            expect(mockGetAllWorkoutsUseCase.execute).toBeCalledTimes(1);
            expect(response.body.data).toStrictEqual(expectedData);
        });

        test('GET /api/workouts returns 500 on use case error', async () => {
            jest.spyOn(mockGetAllWorkoutsUseCase, 'execute').mockImplementation(() => Promise.reject(Error()));
            const response = await request(server).get('/api/workouts');
            expect(response.status).toBe(500);
        });
    });

    describe('GET /api/workouts/:workoutId', () => {
        test('GET /api/workouts/:workoutId', async () => {
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
            };

            jest.spyOn(mockGetOneWorkoutUseCase, "execute").mockImplementation(() => Promise.resolve(expectedData));

            const response = await request(server).get('/api/workouts/1');

            expect(response.status).toBe(200);
            expect(mockGetOneWorkoutUseCase.execute).toBeCalledTimes(1);
            expect(response.body.data).toStrictEqual(expectedData);
        });
        
        test('GET /workouts/:workoutId returns 500 on use case error', async () => {
            jest.spyOn(mockGetOneWorkoutUseCase, 'execute').mockImplementation(() => Promise.reject(Error()));
            const response = await request(server).get('/api/workouts/1');
            expect(response.status).toBe(500);
        });

        test('GET /api/workouts/:workoutId returns 404', async () => {
            jest.spyOn(mockGetOneWorkoutUseCase, 'execute').mockImplementation().mockResolvedValue(null);
            const response = await request(server).get('/api/workouts/1');
            expect(response.status).toBe(404);
        })
    });

    describe('POST /api/workouts', () => {
        test('POST /api/workouts', async () => {
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
            };
        
            jest.spyOn(mockCreateWorkoutUseCase, 'execute').mockImplementation(() => Promise.resolve(inputData));

            const response = await request(server).post('/api/workouts').send(inputData);
            expect(response.status).toBe(201);
        });

        test('POST /api/workouts returns 500 on use case error', async () => {
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
            };

            jest.spyOn(mockCreateWorkoutUseCase, 'execute').mockImplementation(() => Promise.reject(Error()));
            const response = await request(server).post('/api/workouts').send(inputData);
            expect(response.status).toBe(500);
        });
    });

    describe('PATCH /api/workouts/:workoutId', () => {
        test('PATCH /api/workouts/:workoutId', async () => {
            const inputData = {
                name: 'Tommy V changed'
            };

            const expectedData = {
                _id: "6375143efefbca103232f1ff",
                name: "Tommy V changed",
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

            jest.spyOn(mockUpdateWorkoutUseCase, 'execute').mockImplementation(() => Promise.resolve(expectedData));

            const response = await request(server).patch('/api/workouts/1').send(inputData);

            expect(response.status).toBe(200);
            expect(response.body.message).toStrictEqual('Workout updated successfully');
            expect(mockUpdateWorkoutUseCase.execute).toBeCalledTimes(1);
            expect(response.body.data).toStrictEqual(expectedData);
        });

        test('PATCH /api/workouts/:workoutId should return 500 on use case error', async () => {
            const inputData = {
                name: 'Tommy V changed'
            };

            jest.spyOn(mockUpdateWorkoutUseCase, 'execute').mockImplementation(() => Promise.reject(Error()));

            const response = await request(server).patch('/api/workouts/1').send(inputData);

            expect(response.status).toBe(500);
            expect(mockUpdateWorkoutUseCase.execute).toBeCalledTimes(1);
        });

        test('PATCH /api/workouts/:workoutId should return 404', async () => {
            const inputData = {
                name: 'Tommy V changed'
            };
            jest.spyOn(mockUpdateWorkoutUseCase, 'execute').mockImplementation(() => Promise.resolve(null));

            const response = await request(server).patch('/api/workouts/1').send(inputData);

            expect(response.status).toBe(404);
        })
    });

    describe('DELETE /api/workouts/:workoutId', () => {
        test('DELETE /api/workouts/:workoutId', async () => {
            jest.spyOn(mockDeleteWorkoutUseCase, 'execute').mockImplementation();

            const response = await request(server).delete('/api/workouts/1');

            expect(response.status).toBe(204);
            expect(mockDeleteWorkoutUseCase.execute).toBeCalledTimes(1);
        });

        test('DELETE /api/workouts/:workoutId should return 500 on use case error', async () => {
            jest.spyOn(mockDeleteWorkoutUseCase, 'execute').mockImplementation(() => Promise.reject(Error()));

            const response = await request(server).delete('/api/workouts/1');

            expect(response.status).toBe(500);
            expect(mockDeleteWorkoutUseCase.execute).toBeCalledTimes(1);
        });
    });
});