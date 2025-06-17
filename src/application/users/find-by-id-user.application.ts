import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindByIdUserApplicationInput } from './interfaces/find-by-id-user.application.interface';
import { FindByIdUserUsecase } from 'src/core/users/usecases/find-by-id-user.usecase';

@Injectable()
export class FindByIdUserApplication {
  constructor(
    @Inject(FindByIdUserUsecase)
    private findByIdUserUseCase: FindByIdUserUsecase,
  ) {}
  async execute(
    input: FindByIdUserApplicationInput,
  ): Promise<Record<string, any>> {
    try {
      const user = await this.findByIdUserUseCase.execute(input);
      if (!user?.id) {
        throw new BadRequestException('User not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
