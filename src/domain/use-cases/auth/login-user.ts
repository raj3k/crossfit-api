import token from '@/utils/token';
import { UserRepository } from '@/domain/interfaces/repositories/user-repository';
import { LoginUserUseCase } from '@/domain/interfaces/use-cases/auth/login-user-use-case';
import { User } from '@/domain/models/user';


export class LoginUser implements LoginUserUseCase {
    private userRepository: UserRepository

    constructor (userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userCredentials: Pick<User, 'email' | 'password'>): Promise<string> {
        const user = await this.userRepository.getUserByEmail(userCredentials.email);

        if (!user) {
            let error: any = new Error('Unable to find user with that email address');
            error.status = 404
            throw error
        }

        if (await user.isValidPassword(userCredentials.password)) {
            return token.generateAccessToken(user);
        } else {
            let error: any = new Error('Wrong credentials given');
            error.status = 401
            throw error
        }
    }
}