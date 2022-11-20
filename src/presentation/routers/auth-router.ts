import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { LoginUserUseCase } from '@/domain/interfaces/use-cases/auth/login-user-use-case';
import { RegisterUserUseCase } from '@/domain/interfaces/use-cases/auth/register-user-use-case';
import { HttpException } from '@/utils/exceptions/http-exception';

export function AuthRouter(
    registerUserUseCase: RegisterUserUseCase,
    loginUserUseCase: LoginUserUseCase
) {
    const router = express.Router();

    router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = await registerUserUseCase.execute(req.body);
            res.send({
                status: 'OK',
                message: 'User successfully registered',
                token: token
            })
        } catch (error: any) {
            next(new HttpException(error.status, error.message));
        }
    });

    router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = await loginUserUseCase.execute(req.body);
            res.send({
                status: 'OK',
                message: 'User successfully logged in',
                token: token
            })
        } catch (error: any) {
            next(new HttpException(error.status, error.message));
        }
    });

    return router;
}
