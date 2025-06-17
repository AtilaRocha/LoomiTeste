import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { ClientRepository } from '../repository/client.repository';
import { DeleteClientUsecaseInput } from '../interfaces/delete.client.usecase.interface';

@Injectable()
export class DeleteClientUsecase
  implements IUseCase<DeleteClientUsecaseInput, void>
{
  constructor(
    @Inject(ClientRepository)
    private readonly _userRepository: ClientRepository,
  ) {}
  async execute(input: DeleteClientUsecaseInput): Promise<void> {
    await this._userRepository.delete(input.id);
  }
}
