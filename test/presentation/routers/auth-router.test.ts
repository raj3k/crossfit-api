import request from 'supertest';
import { User } from '../../../src/domain/models/user';
import { LoginUserUseCase } from '../../../src/domain/interfaces/use-cases/auth/login-user-use-case';
import { RegisterUserUseCase } from '../../../src/domain/interfaces/use-cases/auth/register-user-use-case';
import { AuthRouter } from '../../../src/presentation/routers/auth-router';
import server from '../../../src/server';


class MockLoginUserUseCase implements LoginUserUseCase {
    execute(userCredentials: Pick<User, 'email' | 'password'>): Promise<string | null> {
        throw new Error('Method not implemented.');
    }
}

class MockRegisterUserUseCase implements RegisterUserUseCase {
    execute(user: User): Promise<string | null> {
        throw new Error('Method not implemented.');
    }
}

describe('Auth Router', () => {
    let mockLoginUserUseCase: MockLoginUserUseCase;
    let mockRegisterUserUseCase: MockRegisterUserUseCase;

    beforeAll(() => {
        mockLoginUserUseCase = new MockLoginUserUseCase;
        mockRegisterUserUseCase = new MockRegisterUserUseCase;
        server.use('/api/auth', AuthRouter(mockRegisterUserUseCase, mockLoginUserUseCase));
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe('POST /auth/login', () => {
        test('should return 200 with token', async () => {
            const userCredentials = {
                email: 'test@gmail.com',
                password: 'password123'
            };

            const expectedToken = 'test_token_123asdfasdf-21312ewqe';

            jest.spyOn(mockLoginUserUseCase, 'execute').mockImplementation(() => Promise.resolve(expectedToken));

            const response = await request(server).post('/api/auth/login').send(userCredentials);

            expect(response.status).toBe(200);
            expect(mockLoginUserUseCase.execute).toBeCalledTimes(1);
            expect(response.body.token).toStrictEqual(expectedToken)
        })
    });

    describe('POST /auth/register', () => {
        test('should return 200 with token', async () => {
            const user = {
                firstName: 'John',
                lastName: 'Smith',
                dateOfBirth: '27/08/1992',
                email: 'john.smith@example.com',
                password: 'password123'
            }

            const expectedToken = 'test_token_123asdfasdf-21312ewqe';

            jest.spyOn(mockRegisterUserUseCase, 'execute').mockImplementation(() => Promise.resolve(expectedToken));

            const response = await request(server).post('/api/auth/register').send(user);

            expect(response.status).toBe(200)
            expect(mockRegisterUserUseCase.execute).toBeCalledTimes(1)
            expect(response.body.token).toStrictEqual(expectedToken);
        })
    });
})


