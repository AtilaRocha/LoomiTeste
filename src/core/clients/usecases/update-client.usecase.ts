import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { ClientRepository } from '../repository/client.repository';
import {
  UpdateClientUsecaseInput,
  UpdateClientUsecaseOutput,
} from '../interfaces/update.client.usecase.interface';

@Injectable()
export class UpdateClientUsecase
  implements IUseCase<UpdateClientUsecaseInput, UpdateClientUsecaseOutput>
{
  constructor(
    @Inject(ClientRepository)
    private readonly _clientRepository: ClientRepository,
  ) {}

  async execute(
    input: UpdateClientUsecaseInput & { id: number },
  ): Promise<UpdateClientUsecaseOutput> {
    const id = input.id;
    delete input.id;

    const updatedClient = await this._clientRepository.update(id, input);

    // Mapeia os campos de snake_case para camelCase
    return {
      id: updatedClient.id,
      userId: updatedClient.user_id,
      full_name: updatedClient.full_name,
      contact: updatedClient.contact,
      address: updatedClient.address,
      status: updatedClient.status,
      created_at: updatedClient.created_at,
      updated_at: updatedClient.updated_at,
    };
  }
}
