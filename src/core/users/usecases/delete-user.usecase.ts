import { IUseCase } from 'src/core/interfaces/IUsecase';
import { DeleteUserUsecaseInput } from '../interfaces/delete.user.usecase.interface';
import { UserRepository } from '../repository/user.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DeleteUserUsecase
  implements IUseCase<DeleteUserUsecaseInput, void>
{
  constructor(
    @Inject(UserRepository) private readonly _userRepository: UserRepository,
  ) {}

  async execute(input: DeleteUserUsecaseInput): Promise<void> {
    await this._userRepository.delete(String(input.id));
  }
}
