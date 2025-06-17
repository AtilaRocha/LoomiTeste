import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { FindByIdUserUsecaseInput } from '../interfaces/find-by-id.user.usecase.interface';
import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entity/user.entity';
import { UserRole } from 'src/shared/user-role.enum';

@Injectable()
export class FindByIdUserUsecase
  implements IUseCase<FindByIdUserUsecaseInput, UserEntity>
{
  constructor(
    @Inject(UserRepository) private readonly _userRepository: UserRepository,
  ) {}

  async execute(input: FindByIdUserUsecaseInput): Promise<UserEntity> {
    const user = await this._userRepository.findById(input.id);

    if (!user) {
      throw new Error('User not found');
    }

    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      type: user.type as UserRole,
      email_verified: user.email_verified,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  }
}
