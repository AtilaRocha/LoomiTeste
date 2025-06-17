import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { ClientRepository } from '../repository/client.repository';
import { Client } from 'src/application/clients/interfaces/list-client.application.interface';
import { ListClientUsecaseInput } from '../interfaces/list.client.usecase.interface';

@Injectable()
export class ListClientUsecase
  implements IUseCase<ListClientUsecaseInput, Client[]>
{
  constructor(
    @Inject(ClientRepository)
    private readonly _clientRepository: ClientRepository,
  ) {}

  async execute(input: ListClientUsecaseInput): Promise<Client[]> {
    const clients = await this._clientRepository.findMany(input);

    return clients.map((client) => ({
      id: client.id,
      userId: client.user_id,
      full_name: client.full_name,
      contact: client.contact,
      address: client.address,
      status: client.status,
      created_at: client.created_at,
      updated_at: client.updated_at,
    }));
  }
}
