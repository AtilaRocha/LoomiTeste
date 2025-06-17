import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DeleteUserApplicationInput } from './interfaces/delete-user.application.interface';
import { FindByIdUserUsecase } from 'src/core/users/usecases/find-by-id-user.usecase';
import { DeleteUserUsecase } from 'src/core/users/usecases/delete-user.usecase';

@Injectable()
export class DeleteUserApplication {
  constructor(
    @Inject(DeleteUserUsecase) private deleteUserUseCase: DeleteUserUsecase,
    @Inject(FindByIdUserUsecase)
    private findByIdUserUseCase: FindByIdUserUsecase,
  ) {}
  async execute(
    input: DeleteUserApplicationInput,
  ): Promise<Record<string, any>> {
    try {
      const user = await this.findByIdUserUseCase.execute(input);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.deleteUserUseCase.execute({ id: user.id });
      return { message: 'user deleted!' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
