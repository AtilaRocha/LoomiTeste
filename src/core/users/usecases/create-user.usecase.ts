import { IUseCase } from 'src/core/interfaces/IUsecase';
import {
  CreateUserUsecaseInput,
  CreateUserUsecaseOutput,
} from '../interfaces/create.user.usecase.interface';
import { UserRepository } from '../repository/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { UserRole } from 'src/shared/user-role.enum';

@Injectable()
export class CreateUserUsecase
  implements IUseCase<CreateUserUsecaseInput, CreateUserUsecaseOutput>
{
  constructor(
    @Inject(UserRepository) private readonly _userRepository: UserRepository,
  ) {}

  async execute(
    input: CreateUserUsecaseInput,
  ): Promise<CreateUserUsecaseOutput> {
    const user = await this._userRepository.create(input);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      type: user.type as UserRole,
      email_verified: user.email_verified,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
