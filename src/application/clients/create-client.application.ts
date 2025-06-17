import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateClientUsecase } from 'src/core/clients/usecases/create-client.usecase';
import {
  CreateClientApplicationInput,
  CreateClientApplicationOutput,
} from './interfaces/create-client.application.interface';
import { ClientUserHttpApplicationInput } from './interfaces/client-user-http.application.interface';

@Injectable()
export class CreateClientApplication {
  constructor(
    @Inject(CreateClientUsecase)
    private createClientUseCase: CreateClientUsecase,
  ) {}
  async execute(
    input: CreateClientApplicationInput,
    user: ClientUserHttpApplicationInput,
  ): Promise<CreateClientApplicationOutput> {
    try {
      await this.createClientUseCase.execute({
        full_name: input.full_name,
        address: input.address,
        contact: input.contact,
        userId: user.id,
      });

      return { message: 'Client created! ' };
    } catch (error) {
      if (error.name === 'QueryFailedError') {
        throw new BadRequestException('Client already exists!');
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
