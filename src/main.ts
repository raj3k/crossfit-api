import 'module-alias/register';

import server from './server';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import { errorMiddleware } from '@/utils/middleware/error-middleware';
import { validateEnv } from '@/utils/validateEnv';

import { WorkoutsRouter } from '@/presentation/routers/workout-router';
import { GetAllWorkouts } from '@/domain/use-cases/workout/get-all-workouts';
import { GetOneWorkout } from '@/domain/use-cases/workout/get-one-workout';
import { CreateWorkout } from '@/domain/use-cases/workout/create-workout';
import { UpdateWorkout } from '@/domain/use-cases/workout/update-workout';
import { DeleteWorkout } from '@/domain/use-cases/workout/delete-workout';
import { WorkoutRepositoryImpl } from '@/domain/repositories/workout-repository';
import { MongoDBWorkoutDataSource } from '@/data/data-sources/mongodb/mongodb-workout-data-source';
import { WorkoutModel } from '@/domain/models/workout';
import { AuthRouter } from '@/presentation/routers/auth-router';
import { RegisterUser } from '@/domain/use-cases/auth/register-user';
import { LoginUser } from '@/domain/use-cases/auth/login-user';

dotenv.config();
validateEnv();

(async () => {
    mongoose.connect(`${process.env.DATABASE_URL}`);

    const workoutMiddleWare = WorkoutsRouter(
        new GetAllWorkouts(new WorkoutRepositoryImpl(new MongoDBWorkoutDataSource(WorkoutModel))),
        new GetOneWorkout(new WorkoutRepositoryImpl(new MongoDBWorkoutDataSource(WorkoutModel))),
        new CreateWorkout(new WorkoutRepositoryImpl(new MongoDBWorkoutDataSource(WorkoutModel))),
        new UpdateWorkout(new WorkoutRepositoryImpl(new MongoDBWorkoutDataSource(WorkoutModel))),
        new DeleteWorkout(new WorkoutRepositoryImpl(new MongoDBWorkoutDataSource(WorkoutModel)))
    )

    const authMiddleware = AuthRouter(
        new RegisterUser(),
        new LoginUser()
    )

    server.use('/api/workouts', workoutMiddleWare);
    server.use('/api/auth', authMiddleware)
    server.use(errorMiddleware);
    server.listen(process.env.PORT || 4000, () => console.log('Running on server'));
})();