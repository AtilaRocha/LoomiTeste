import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  UpdateUserApplicationInput,
  UpdateUserApplicationOutput,
} from './interfaces/update-user.application.interface';
import { VerifyEmailUsecase } from 'src/core/users/usecases/verify-email.usecase';
import { UpdateUserUsecase } from 'src/core/users/usecases/update-user.usecase';
import { FindByIdUserUsecase } from 'src/core/users/usecases/find-by-id-user.usecase';
import { FindByIdUserApplicationInput } from './interfaces/find-by-id-user.application.interface';
import { Bcrypt } from 'src/presentation/guard/bcrypt';

@Injectable()
export class UpdateUserApplication {
  constructor(
    @Inject(UpdateUserUsecase) private updateUserUseCase: UpdateUserUsecase,
    @Inject(VerifyEmailUsecase) private verifyEmailUsecase: VerifyEmailUsecase,
    @Inject(FindByIdUserUsecase)
    private findByIdUserUseCase: FindByIdUserUsecase,
    @Inject(Bcrypt) private readonly bcrypt: Bcrypt,
  ) {}

  async execute(
    param: FindByIdUserApplicationInput,
    input: UpdateUserApplicationInput,
  ): Promise<UpdateUserApplicationOutput> {
    try {
      const user = await this.findByIdUserUseCase.execute(param);
      if (!user?.id) {
        throw new BadRequestException('User not found!');
      }

      const keysToCheck = Object.keys(input);
      const isAnyKeyPresent = keysToCheck.some((key) => key in user);
      if (!isAnyKeyPresent) {
        throw new BadRequestException('Not field to update');
      }

      const dataToUpdate = { ...input };

      if (dataToUpdate.password) {
        dataToUpdate.password = await this.bcrypt.hash(dataToUpdate.password);
      }

      await this.updateUserUseCase.execute({ id: user.id, ...dataToUpdate });

      return { message: 'User updated!' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
