import { UserRepository } from './../../../../src/domain/interfaces/repositories/user-repository';
import { RegisterUser } from './../../../../src/domain/use-cases/auth/register-user';
import { User, ResponseUser } from './../../../../src/domain/models/user';
import * as dotenv from 'dotenv';
dotenv.config();


describe('Register User Use Case', () => {
    class MockUserRepository implements UserRepository {
        createUser(user: User): Promise<ResponseUser> {
            throw new Error('Method not implemented.');
        }
        getUser(email: string): Promise<ResponseUser> {
            throw new Error('Method not implemented.');
        }
    }

    let mockUserRepository: MockUserRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockUserRepository = new MockUserRepository();
    });

    test('should make createUser call on userRepository and return user and then access token', async () => {
        const inputData = {
            firstName: 'John',
            lastName: 'Smith',
            dateOfBirth: '27/08/1992',
            email: 'john.smith@example.com',
            password: 'password123'
        }

        const expectedData: ResponseUser = {
            _id: "6375143efefbca103232f1ff",
            ...inputData,
            createdAt: "4/20/2022, 2:21:56 PM",
            updatedAt: "4/20/2022, 2:21:56 PM",
            isValidPassword: function (password: string): Promise<boolean | Error> {
                throw new Error('Function not implemented.');
            }
        }

        jest.spyOn(mockUserRepository, 'createUser').mockImplementation(() => Promise.resolve(expectedData));

        const registerUserUseCase = new RegisterUser(mockUserRepository);
        const result = await registerUserUseCase.execute(inputData);

        expect(mockUserRepository.createUser).toBeCalledTimes(1);
        expect(typeof result).toBe('string');
    });

});
