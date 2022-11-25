import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { GetOneUserUseCase } from '@/domain/interfaces/use-cases/user/get-one-user-use-case';
import { HttpException } from '@/utils/exceptions/http-exception';

export function UserRouter(
    getOneUserUseCase: GetOneUserUseCase
) {
    const router = express.Router();

    router.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { params: { userId } } = req;
            const user = await getOneUserUseCase.execute(userId);
            if (!user) {
                let error: any = new Error(`user with id: ${userId} don't exist`);
                error.status = 404
                throw error
            }
            res.send({
                data: user
            });
        } catch (error: any) {
            next(new HttpException(error.status, error.message));
        }
    });

    return router;
}