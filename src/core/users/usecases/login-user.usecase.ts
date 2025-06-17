import { IUseCase } from 'src/core/interfaces/IUsecase';
import { CreateUserUsecaseOutput } from '../interfaces/create.user.usecase.interface';
import { UserRepository } from '../repository/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { LoginUserUsecaseInput } from '../interfaces/login.user.usecase.interface';
import { UserRole } from 'src/shared/user-role.enum';

@Injectable()
export class LoginUserUsecase
  implements IUseCase<LoginUserUsecaseInput, CreateUserUsecaseOutput>
{
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute(
    input: LoginUserUsecaseInput,
  ): Promise<CreateUserUsecaseOutput> {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new Error('User not found');
    }

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
