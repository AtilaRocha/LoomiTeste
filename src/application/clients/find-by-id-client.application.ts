import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FindByIdClientApplicationInput } from './interfaces/find-by-id-client.application.interface';
import { FindByIdClientUsecase } from 'src/core/clients/usecases/find-by-id.client.usecase';

@Injectable()
export class FindByIdClientApplication {
  constructor(
    @Inject(FindByIdClientUsecase)
    private findByIdClientUseCase: FindByIdClientUsecase,
  ) {}
  async execute(
    input: FindByIdClientApplicationInput,
  ): Promise<Record<string, any>> {
    try {
      const client = await this.findByIdClientUseCase.execute(input);
      if (!client?.id) {
        throw new NotFoundException('Client not found');
      }
      return client;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
