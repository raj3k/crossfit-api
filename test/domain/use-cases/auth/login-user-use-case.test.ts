import { LoginUser } from './../../../../src/domain/use-cases/auth/login-user';
import { UserRepository } from './../../../../src/domain/interfaces/repositories/user-repository';
import { User, ResponseUser } from './../../../../src/domain/models/user';
import * as dotenv from 'dotenv';

dotenv.config();

describe('Login User Use Case', () => {
    class MockUserRepository implements UserRepository {
        createUser(user: User): Promise<ResponseUser> {
            throw new Error('Method not implemented.');
        }
        getUser(email: string): Promise<ResponseUser | null> {
            throw new Error('Method not implemented.');
        }
    }

    let mockUserRepository: MockUserRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockUserRepository = new MockUserRepository();
    });

    test('should make getUser call on userRepository and return user and then access token', async () => {
        const inputCredentials = {
            email: "john.smith@example.com",
            password: "password123"
        };
        const expectedData: ResponseUser = {
            _id: "6375143efefbca103232f1ff",
            firstName: 'John',
            lastName: 'Smith',
            dateOfBirth: '27/08/1992',
            email: 'john.smith@example.com',
            password: 'password123',
            createdAt: "4/20/2022, 2:21:56 PM",
            updatedAt: "4/20/2022, 2:21:56 PM",
            isValidPassword: function (password: string): Promise<boolean | Error> {
                throw new Error('Function not implemented.');
            }
        };
        jest.spyOn(mockUserRepository, 'getUser').mockImplementation(() => Promise.resolve(expectedData));

        jest.spyOn(expectedData, 'isValidPassword').mockImplementation(async () => true)

        const loginUserUseCase = new LoginUser(mockUserRepository);
        const result = await loginUserUseCase.execute(inputCredentials);

        expect(mockUserRepository.getUser).toBeCalledTimes(1);
        expect(typeof result).toBe('string');
    });

    test('should make getUser call on userRepository and return null and then throw error with 404', async () => {
        const inputCredentials = {
            email: "john.smith@example.com",
            password: "password123"
        };
        jest.spyOn(mockUserRepository, 'getUser').mockImplementation(async () => null);

        const loginUserUseCase = new LoginUser(mockUserRepository);
        try {
            const result = await loginUserUseCase.execute(inputCredentials);
        } catch (error: any) {
            expect(error.message).toStrictEqual('Unable to find user with that email address');
            expect(error).toHaveProperty('status', 404);
        }
    });

    test('should make getUser call on userRepository and return null and then throw error with 404', async () => {
        const inputCredentials = {
            email: "john.smith@example.com",
            password: "password123"
        };
        const expectedData: ResponseUser = {
            _id: "6375143efefbca103232f1ff",
            firstName: 'John',
            lastName: 'Smith',
            dateOfBirth: '27/08/1992',
            email: 'john.smith@example.com',
            password: 'password123',
            createdAt: "4/20/2022, 2:21:56 PM",
            updatedAt: "4/20/2022, 2:21:56 PM",
            isValidPassword: function (password: string): Promise<boolean | Error> {
                throw new Error('Function not implemented.');
            }
        };
        jest.spyOn(mockUserRepository, 'getUser').mockImplementation(() => Promise.resolve(expectedData));

        jest.spyOn(expectedData, 'isValidPassword').mockImplementation(async () => false)

        try {
            const loginUserUseCase = new LoginUser(mockUserRepository);
            const result = await loginUserUseCase.execute(inputCredentials);
        } catch (error: any) {
            expect(error.message).toStrictEqual('Wrong credentials given');
            expect(error).toHaveProperty('status', 401);
        }
    });
});