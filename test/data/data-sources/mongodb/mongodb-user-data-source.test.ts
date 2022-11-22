import { ResponseUser, User } from './../../../../src/domain/models/user';
import { MongoDBUserDataSource } from './../../../../src/data/data-sources/mongodb/mongodb-user-data-source';
import { MongooseModelWrapper } from '../../../../src/data/interfaces/data-sources/mongoose-model-wrapper';

describe('MongoDB User DataSource', () => {
    let mockDatabase: MongooseModelWrapper;

    beforeAll(() => {
        mockDatabase = {
            find: jest.fn(),
            findById: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn()
        }
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('create', async () => {
        const ds = new MongoDBUserDataSource(mockDatabase);

        const inputData: User = {
            firstName: 'John',
            lastName: 'Smith',
            dateOfBirth: '01/01/1990',
            email: 'john.smith@example.com',
            password: 'password123'
        }

        const expectedData: ResponseUser = {
            _id: '637d3ef667eee3e83381175d',
            createdAt: '2022-11-22T21:28:22.301+00:00',
            updatedAt: '2022-11-22T21:28:22.301+00:00',
            isValidPassword: function (password: string): Promise<boolean | Error> {
                throw new Error('Function not implemented.');
            },
            firstName: 'John',
            lastName: 'Smith',
            dateOfBirth: '01/01/1990',
            email: 'john.smith@example.com',
            password: 'password123'
        }

        jest.spyOn(mockDatabase, 'create').mockImplementation(() => Promise.resolve(expectedData));

        const result = await ds.create(inputData);

        expect(mockDatabase.create).toBeCalledTimes(1);
        expect(result).toStrictEqual(expectedData);
    });

    test('findOne', async () => {
        const ds = new MongoDBUserDataSource(mockDatabase);
        const inputData = {
            email: 'john.smith@example.com'
        }

        const expectedData: ResponseUser = {
            _id: '637d3ef667eee3e83381175d',
            createdAt: '2022-11-22T21:28:22.301+00:00',
            updatedAt: '2022-11-22T21:28:22.301+00:00',
            isValidPassword: function (password: string): Promise<boolean | Error> {
                throw new Error('Function not implemented.');
            },
            firstName: 'John',
            lastName: 'Smith',
            dateOfBirth: '01/01/1990',
            email: 'john.smith@example.com',
            password: 'password123'
        }

        jest.spyOn(mockDatabase, 'findOne').mockImplementation(() => Promise.resolve(expectedData));

        const result = await ds.getOne(inputData.email);

        expect(mockDatabase.findOne).toBeCalledTimes(1);
        expect(result).toStrictEqual(expectedData);
    });
});