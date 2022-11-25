import { ResponseUser } from '@/domain/models/user';

export interface GetOneUserUseCase {
    execute(id: string): Promise<ResponseUser | null>
}