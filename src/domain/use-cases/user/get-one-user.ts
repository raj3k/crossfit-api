import { ResponseUser } from '@/domain/models/user';
import { UserRepository } from '@/domain/interfaces/repositories/user-repository';
import { GetOneUserUseCase } from '@/domain/interfaces/use-cases/user/get-one-user-use-case';

export class GetOneUser implements GetOneUserUseCase {
    private userRepository: UserRepository

    constructor (userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(id: string): Promise<ResponseUser | null> {
        const result = await this.userRepository.getUserById(id);
        return result;
    }
}