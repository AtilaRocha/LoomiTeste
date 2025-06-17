import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/postgres/prisma/prisma.service';
import { Bcrypt } from 'src/presentation/guard/bcrypt';
import { AuthService } from 'src/presentation/guard/auth.service';
import { LoginUserApplicationInput } from './interfaces/login-user.application.interface';

@Injectable()
export class LoginUserApplication {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(Bcrypt) private readonly bcrypt: Bcrypt,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  async execute(input: LoginUserApplicationInput): Promise<{ token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email },
      include: {
        client: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.bcrypt.compare(
      input.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password, ...payload } = user;
    const token = await this.authService.createToken(payload);

    return { token };
  }
}
