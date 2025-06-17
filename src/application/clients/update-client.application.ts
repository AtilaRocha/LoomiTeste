import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FindByIdClientUsecase } from 'src/core/clients/usecases/find-by-id.client.usecase';
import { UpdateClientUsecase } from 'src/core/clients/usecases/update-client.usecase';
import { FindByIdClientApplicationInput } from './interfaces/find-by-id-client.application.interface';
import {
  UpdateClientApplicationInput,
  UpdateClientApplicationOutput,
} from './interfaces/update-client.application.interface';

@Injectable()
export class UpdateClientApplication {
  constructor(
    @Inject(UpdateClientUsecase)
    private updateClientUseCase: UpdateClientUsecase,
    @Inject(FindByIdClientUsecase)
    private findByIdClientUseCase: FindByIdClientUsecase,
  ) {}
  async execute(
    param: FindByIdClientApplicationInput,
    input: UpdateClientApplicationInput,
  ): Promise<UpdateClientApplicationOutput> {
    try {
      if (Object.keys(input).length === 0) {
        throw new BadRequestException('No fields to update provided.');
      }

      const client = await this.findByIdClientUseCase.execute(param);
      if (!client?.id) {
        throw new NotFoundException('Client not found!');
      }

      await this.updateClientUseCase.execute({ id: client.id, ...input });
      return { message: 'Client updated!' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
