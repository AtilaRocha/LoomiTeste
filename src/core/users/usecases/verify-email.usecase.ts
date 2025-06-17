import { Inject, Injectable } from '@nestjs/common';
import { VerifyEmailInput } from '../interfaces/verify.email.usecase.interface';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class VerifyEmailUsecase implements IUseCase<VerifyEmailInput, boolean> {
  constructor(
    @Inject(UserRepository) private readonly _userRepository: UserRepository,
  ) {}
  async execute(input: VerifyEmailInput): Promise<boolean> {
    const user = await this._userRepository.findByEmail(input.email);
    return user?.id ? true : false;
  }
}
