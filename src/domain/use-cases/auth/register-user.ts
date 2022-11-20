
import { UserRepository } from '@/domain/interfaces/repositories/user-repository';
import { RegisterUserUseCase } from '@/domain/interfaces/use-cases/auth/register-user-use-case';
import { User } from '@/domain/models/user';
import token from '@/utils/token';


export class RegisterUser implements RegisterUserUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(user: User): Promise<string> {
        const newUser = await this.userRepository.createUser(user);

        const accessToken = token.generateAccessToken(newUser);

        return accessToken;
    }
}