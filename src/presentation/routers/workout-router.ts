import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { GetAllWorkoutsUseCase } from '@/domain/interfaces/use-cases/workout/get-all-workouts-use-case';
import { GetOneWorkoutUseCase } from '@/domain/interfaces/use-cases/workout/get-one-workout-use-case';
import { CreateWorkoutUseCase } from '@/domain/interfaces/use-cases/workout/create-workout-use-case';
import { UpdateWorkoutUseCase } from '@/domain/interfaces/use-cases/workout/update-workout-use-case';
import { DeleteWorkoutUseCase } from '@/domain/interfaces/use-cases/workout/delete-workout-use-case';
import { HttpException } from '@/utils/exceptions/http-exception';

export function WorkoutsRouter(
    getAllWorkoutsUseCase: GetAllWorkoutsUseCase,
    getOneWorkoutUseCase: GetOneWorkoutUseCase,
    createWorkoutUseCase: CreateWorkoutUseCase,
    updateWorkoutUseCase: UpdateWorkoutUseCase,
    deleteWorkoutUseCase: DeleteWorkoutUseCase
) {
    const router = express.Router();

    router.get('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const workouts = await getAllWorkoutsUseCase.execute();
            res.send({
                status: 'OK', 
                message: 'Workouts retrieved successfully',
                data: workouts
            });
        } catch (error: any) {
            next(new HttpException(error.status, error.message));
        }
    });
    
    router.get('/:workoutId', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { workoutId } = req.params;
            const workout = await getOneWorkoutUseCase.execute(workoutId);
            if (!workout) {
                let error: any = new Error(`workout with id: ${workoutId} don't exist`);
                error.status = 404
                throw error
            }
            res.send({
                status: 'OK', 
                message: 'Workout retrieved successfully', 
                data: workout
            });
        } catch (error: any) {
            next(new HttpException(error.status, error.message));
        }
    });

    router.post('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req;
            const createdWorkout = await createWorkoutUseCase.execute(body);
            res.status(201).send({
                status: 'OK', 
                message: 'Workout created successfully', 
                data: createdWorkout
            });
        } catch (error: any) {
            next(new HttpException(error.status, error.message));
        }
    });

    router.put('/:workoutId', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body, params: { workoutId } } = req;
            const updatedWorkout = await updateWorkoutUseCase.execute(workoutId, body);
            if (!updatedWorkout) {
                let error: any = new Error(`workout with id: ${workoutId} don't exist`);
                error.status = 404
                throw error
            }
            res.send({
                status: 'OK', 
                message: 'Workout updated successfully', 
                data: updatedWorkout
            });
        } catch (error: any) {
            next(new HttpException(error.status, error.message));
        }
    });

    router.delete('/:workoutId', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { workoutId } = req.params;
            await deleteWorkoutUseCase.execute(workoutId);
            res.status(204).send({
                status: 'OK',
                message: 'Workout deleted successfully',
            })
        } catch (error: any) {
            next(new HttpException(error.status, error.message));
        }
    });

    return router;
}
