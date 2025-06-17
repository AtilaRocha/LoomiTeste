import { IUseCase } from 'src/core/interfaces/IUsecase';
import { ActivedAccountUsecaseInput } from '../interfaces/actived.account.usecase.interface';
import { UserRepository } from '../repository/user.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ActivedAccountUsecase
  implements IUseCase<ActivedAccountUsecaseInput, void>
{
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}
  async execute(input: ActivedAccountUsecaseInput): Promise<void> {
    await this.userRepository.update(input.id, { email_verified: true });
  }
}
