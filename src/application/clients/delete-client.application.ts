import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DeleteClientApplicationInput } from './interfaces/delete-client.application.interface';
import { FindByIdClientUsecase } from 'src/core/clients/usecases/find-by-id.client.usecase';
import { DeleteClientUsecase } from 'src/core/clients/usecases/delete-client.usecase';

@Injectable()
export class DeleteClientApplication {
  constructor(
    @Inject(DeleteClientUsecase)
    private deleteClientUseCase: DeleteClientUsecase,
    @Inject(FindByIdClientUsecase)
    private findByIdClientUseCase: FindByIdClientUsecase,
  ) {}
  async execute(
    input: DeleteClientApplicationInput,
  ): Promise<Record<string, any>> {
    try {
      const client = await this.findByIdClientUseCase.execute(input);
      if (!client) {
        throw new NotFoundException('Client not found');
      }
      await this.deleteClientUseCase.execute({ id: client.id });
      return { message: 'client deleted!' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
