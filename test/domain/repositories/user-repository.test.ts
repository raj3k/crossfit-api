import { UserRepositoryImpl } from './../../../src/domain/repositories/user-repository';
import { User, ResponseUser } from './../../../src/domain/models/user';
import { UserRepository } from './../../../src/domain/interfaces/repositories/user-repository';
import { UserDataSource } from './../../../src/data/interfaces/data-sources/user-data-source';

class MockUserDataSource implements UserDataSource {
    create(user: User): Promise<ResponseUser> {
        throw new Error('Method not implemented.');
    }
    getOne(email: string): Promise<ResponseUser> {
        throw new Error('Method not implemented.');
    }
}

describe('User Repository', () => {
    let mockUserDataSource: MockUserDataSource;
    let userRepository: UserRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockUserDataSource = new MockUserDataSource();
        userRepository = new UserRepositoryImpl(mockUserDataSource);
    });

    describe('Create New User', () => {
        test('should return newly create user', async () => {
            const inputData: User = {
                firstName: "John",
                lastName: "Smith",
                dateOfBirth: "01/01/1990",
                email: "john.smith@example.com",
                password: "password123"
            }
            const newUser: ResponseUser = {
                _id: "637d3ef667eee3e83381175d",
                ...inputData,
                createdAt: "2022-11-22T21:28:22.301+00:00",
                updatedAt: "2022-11-22T21:28:22.301+00:00",
                isValidPassword: function (password: string): Promise<boolean | Error> {
                    throw new Error('Function not implemented.');
                }
            };

            jest.spyOn(mockUserDataSource, 'create').mockImplementation(() => Promise.resolve(newUser));

            const result = await userRepository.createUser(inputData);
            expect(result).toStrictEqual(newUser);
            expect(mockUserDataSource.create).toBeCalledTimes(1);
        });
    });

    describe('Find user by email', () => {
        test('should return found user data', async () => {
            const userCredentials = {
                email: "john.smith@example.com",
                password: "password123"
            };

            const expectedData: ResponseUser = {
                _id: '637d3ef667eee3e83381175d',
                createdAt: '2022-11-22T21:28:22.301+00:00',
                updatedAt: '2022-11-22T21:28:22.301+00:00',
                firstName: 'John',
                lastName: 'Smith',
                dateOfBirth: '01/01/1990',
                email: 'john.smith@example.com',
                password: 'password123',
                isValidPassword: function (password: string): Promise<boolean | Error> {
                    throw new Error('Function not implemented.');
                },
            };

            jest.spyOn(mockUserDataSource, 'getOne').mockImplementation(() => Promise.resolve(expectedData));

            const result = await userRepository.getUser(userCredentials.email);
            
            expect(result).toStrictEqual(expectedData);
            expect(mockUserDataSource.getOne).toBeCalledTimes(1);
        });
    });
});