import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ActivedAccountUsecase } from 'src/core/users/usecases/actived-account.usecase';
import { FindByIdUserUsecase } from 'src/core/users/usecases/find-by-id-user.usecase';
import { AuthService } from 'src/presentation/guard/auth.service';
import {
  ActivedAccountApplicationInput,
  ActivedAccountApplicationOutput,
} from './interfaces/actived-account.application.interface';

@Injectable()
export class ActivedAccountApplication {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(ActivedAccountUsecase)
    private readonly activedAccountUsecase: ActivedAccountUsecase,
    @Inject(FindByIdUserUsecase)
    private readonly findByIdUserUsecase: FindByIdUserUsecase,
  ) {}

  async execute(
    input: ActivedAccountApplicationInput,
  ): Promise<ActivedAccountApplicationOutput> {
    try {
      const tokenData = await this.authService.checkToken(input.token);

      if (!tokenData) {
        throw new UnauthorizedException('Token inválido ou expirado.');
      }

      const decoded = tokenData.user;
      const user = await this.findByIdUserUsecase.execute({ id: decoded.id });

      await this.activedAccountUsecase.execute({ id: user.id });

      return {
        message: 'Actived account!',
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }
}
