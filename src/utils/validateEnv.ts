import { cleanEnv, str, port } from 'envalid';

export const validateEnv = (): void => {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production'],
        }),
        DATABASE_URL: str(),
        PORT: port({ default: 3000 }),
    });
}