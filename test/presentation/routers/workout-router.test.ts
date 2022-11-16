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
        server.use('/workouts', WorkoutsRouter(mockGetAllWorkoutsUseCase, mockGetOneWorkoutUseCase, mockCreateWorkoutUseCase, mockUpdateWorkoutUseCase, mockDeleteWorkoutUseCase))
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /workouts', () => {
        test('should return 200 with data', async () => {
            const expectedData = [{
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
            }]

            jest.spyOn(mockGetAllWorkoutsUseCase, "execute").mockImplementation(() => Promise.resolve(expectedData));

            const response = await request(server).get('/workouts');

            expect(response.status).toBe(200);
            expect(mockGetAllWorkoutsUseCase.execute).toBeCalledTimes(1);
            expect(response.body.data).toStrictEqual(expectedData);
        });

        test('GET /workouts returns 500 on use case error', async () => {
            jest.spyOn(mockGetAllWorkoutsUseCase, 'execute').mockImplementation(() => Promise.reject(Error()));
            const response = await request(server).get('/workouts');
            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({message: 'Error fetching data'});
        });
    });

    describe('GET /workouts/:workoutId', () => {
        test('GET /workouts/:workoutId', async () => {
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

            const response = await request(server).get('/workouts/1');

            expect(response.status).toBe(200);
            expect(mockGetOneWorkoutUseCase.execute).toBeCalledTimes(1);
            expect(response.body.data).toStrictEqual(expectedData);
        });
        
        test('GET /workouts/:workoutId returns 500 on use case error', async () => {
            jest.spyOn(mockGetOneWorkoutUseCase, 'execute').mockImplementation(() => Promise.reject(Error()));
            const response = await request(server).get('/workouts/1');
            expect(response.status).toBe(500);
            expect(response.body).toStrictEqual({message: 'Error fetching data'});
        });
    });

    describe('POST /workouts', () => {
        test('POST /workouts', async () => {
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

            const response = await request(server).post('/workouts').send(inputData);
            expect(response.status).toBe(201);
        });

        test('POST /workouts returns 500 on use case error', async () => {
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
            const response = await request(server).post('/workouts').send(inputData);
            expect(response.status).toBe(500);
        });
    });

    describe('PATCH /workouts/:workoutId', () => {
        test('PATCH /workouts/:workoutId', async () => {
            const inputData = {
                name: 'Tommy V changed'
            };

            const expectedData = {
                id: "1",
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

            const response = await request(server).patch('/workouts/1').send(inputData);

            expect(response.status).toBe(200);
            expect(response.body.message).toStrictEqual('Workout updated successfully');
            expect(mockUpdateWorkoutUseCase.execute).toBeCalledTimes(1);
            expect(response.body.data).toStrictEqual(expectedData);
        });

        test('PATCH /workouts/:workoutId should return 500 on use case error', async () => {
            const inputData = {
                name: 'Tommy V changed'
            };

            jest.spyOn(mockUpdateWorkoutUseCase, 'execute').mockImplementation(() => Promise.reject(Error()));

            const response = await request(server).patch('/workouts/1').send(inputData);

            expect(response.status).toBe(500);
            expect(mockUpdateWorkoutUseCase.execute).toBeCalledTimes(1);
        });
    });

    describe('DELETE /workouts/:workoutId', () => {
        test('DELETE /workouts/:workoutId', async () => {
            jest.spyOn(mockDeleteWorkoutUseCase, 'execute').mockImplementation();

            const response = await request(server).delete('/workouts/1');

            expect(response.status).toBe(204);
            expect(mockDeleteWorkoutUseCase.execute).toBeCalledTimes(1);
        });

        test('DELETE /workouts/:workoutId should return 500 on use case error', async () => {
            jest.spyOn(mockDeleteWorkoutUseCase, 'execute').mockImplementation(() => Promise.reject(Error()));

            const response = await request(server).delete('/workouts/1');

            expect(response.status).toBe(500);
            expect(mockDeleteWorkoutUseCase.execute).toBeCalledTimes(1);
        });
    });
});