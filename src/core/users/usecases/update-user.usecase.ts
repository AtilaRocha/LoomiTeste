import { Inject, Injectable } from '@nestjs/common';
import {
  UpdateUserUsecaseInput,
  UpdateUserUsecaseOutput,
} from '../interfaces/update.user.usecase.interface';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { UserRepository } from '../repository/user.repository';
import { UserRole } from 'src/shared/user-role.enum';

@Injectable()
export class UpdateUserUsecase
  implements
    IUseCase<UpdateUserUsecaseInput & { id: number }, UpdateUserUsecaseOutput>
{
  constructor(
    @Inject(UserRepository) private readonly _userRepository: UserRepository,
  ) {}

  async execute(
    input: UpdateUserUsecaseInput & { id: number },
  ): Promise<UpdateUserUsecaseOutput> {
    const { id, ...data } = input;

    const user = await this._userRepository.update(String(id), data);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      type: user.type as UserRole,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
