import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ListClientApplicationInput,
  ListClientApplicationOutput,
} from './interfaces/list-client.application.interface';
import { ListClientUsecase } from 'src/core/clients/usecases/list-client.usecase';

@Injectable()
export class ListClientApplication {
  constructor(
    @Inject(ListClientUsecase) private listClientUseCase: ListClientUsecase,
  ) {}
  async execute(
    input: ListClientApplicationInput,
  ): Promise<ListClientApplicationOutput> {
    try {
      const clients = await this.listClientUseCase.execute(input);
      return { clients: clients };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
