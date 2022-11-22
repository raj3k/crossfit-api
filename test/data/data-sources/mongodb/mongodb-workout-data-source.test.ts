import { MongooseModelWrapper } from '../../../../src/data/interfaces/data-sources/mongoose-model-wrapper';
import { MongoDBWorkoutDataSource } from './../../../../src/data/data-sources/mongodb/mongodb-workout-data-source';

describe('MongoDB DataSource', () => {
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

    test('findAll', async () => {
        const ds = new MongoDBWorkoutDataSource(mockDatabase);
        const expectedResult = [{
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
        }];

        jest.spyOn(mockDatabase, 'find').mockImplementation(() => Promise.resolve(expectedResult));
        const result = await ds.getAll();
        expect(mockDatabase.find).toHaveBeenCalledWith();
        expect(result).toStrictEqual(expectedResult);
    });

    test('findOne', async () => {
        const ds = new MongoDBWorkoutDataSource(mockDatabase);
        const expectedResult = {
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
        };

        jest.spyOn(mockDatabase, 'findById').mockImplementation(() => Promise.resolve(expectedResult));
        const result = await ds.getOne("1");
        expect(mockDatabase.findById).toHaveBeenCalledWith("1");
        expect(result).toStrictEqual(expectedResult);
    });

    test('create', async () => {
        const ds = new MongoDBWorkoutDataSource(mockDatabase);
        const inputData = { 
            name: "Tommy V",
            mode: "AMRAP 20",
            equipment: [
                "rack",
                "barbell",
                "abmat"
            ],
            exercises: [
                "15 toes to bars",
                "10 thrusters",
                "30 abmat sit-ups"
            ],
            trainerTips: [
                "Split your toes to bars into two sets maximum",
                "Go unbroken on the thrusters",
                "Take the abmat sit-ups as a chance to normalize your breath"
            ]
        }
        const expectedResult = {
            _id: "6375143efefbca103232f1ff",
            name: "Tommy V",
            mode: "AMRAP 20",
            equipment: [
                "rack",
                "barbell",
                "abmat"
            ],
            exercises: [
                "15 toes to bars",
                "10 thrusters",
                "30 abmat sit-ups"
            ],
            trainerTips: [
                "Split your toes to bars into two sets maximum",
                "Go unbroken on the thrusters",
                "Take the abmat sit-ups as a chance to normalize your breath"
            ],
            createdAt: "2022-11-16T16:47:58.890Z",
            updatedAt: "2022-11-16T16:47:58.890Z"
        }

        jest.spyOn(mockDatabase, 'create').mockImplementation(() => Promise.resolve(expectedResult));
        const result = await ds.create(inputData);
        expect(mockDatabase.create).toHaveBeenCalledWith(inputData);
        expect(mockDatabase.create).toBeCalledTimes(1);
        expect(result).toStrictEqual(expectedResult);
    });

    test('updateOne', async () => {
        const ds = new MongoDBWorkoutDataSource(mockDatabase);
        const inputData = { 
            name: "Tommy V Updated",
            mode: "AMRAP 20",
            equipment: [
                "rack",
                "barbell",
                "abmat"
            ],
            exercises: [
                "15 toes to bars",
                "10 thrusters",
                "30 abmat sit-ups"
            ],
            trainerTips: [
                "Split your toes to bars into two sets maximum",
                "Go unbroken on the thrusters",
                "Take the abmat sit-ups as a chance to normalize your breath"
            ]
        }
        const expectedResult = {
            _id: "6375143efefbca103232f1ff",
            name: "Tommy V Updated",
            mode: "AMRAP 20",
            equipment: [
                "rack",
                "barbell",
                "abmat"
            ],
            exercises: [
                "15 toes to bars",
                "10 thrusters",
                "30 abmat sit-ups"
            ],
            trainerTips: [
                "Split your toes to bars into two sets maximum",
                "Go unbroken on the thrusters",
                "Take the abmat sit-ups as a chance to normalize your breath"
            ],
            createdAt: "2022-11-16T16:47:58.890Z",
            updatedAt: "2022-11-16T16:47:58.890Z"
        }
        jest.spyOn(mockDatabase, 'findByIdAndUpdate').mockImplementation(() => Promise.resolve(expectedResult));
        const result = await ds.updateOne('6375143efefbca103232f1ff', inputData);
        expect(mockDatabase.findByIdAndUpdate).toHaveBeenCalledWith('6375143efefbca103232f1ff', inputData, {new: true});
        expect(mockDatabase.findByIdAndUpdate).toBeCalledTimes(1);
        expect(result).toStrictEqual(expectedResult);
    });

    test('deleteOne', async () => {
        const ds = new MongoDBWorkoutDataSource(mockDatabase);
        const result = await ds.deleteOne("6375143efefbca103232f1ff");
        expect(mockDatabase.findByIdAndDelete).toBeCalledTimes(1);
        expect(mockDatabase.findByIdAndDelete).toHaveBeenCalledWith("6375143efefbca103232f1ff");
    });
});