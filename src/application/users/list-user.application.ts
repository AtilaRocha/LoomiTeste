import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ListUserApplicationInput,
  ListUserApplicationOutput,
} from './interfaces/list-user.application.interface';
import { ListUserUsecase } from 'src/core/users/usecases/list-user.usecase';

@Injectable()
export class ListUserApplication {
  constructor(
    @Inject(ListUserUsecase) private listUserUseCase: ListUserUsecase,
  ) {}
  async execute(
    input: ListUserApplicationInput,
  ): Promise<ListUserApplicationOutput> {
    try {
      const users = await this.listUserUseCase.execute(input);
      return { users: users };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
