import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  ForbiddenException,
  UnauthorizedException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../roles.decorator';
import { AuthService } from './auth.service';
import { IS_PUBLIC_KEY } from '../public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(
    private reflector: Reflector,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log('--- [INICIANDO VERIFICAÇÃO DO GUARD] ---');

    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );

      this.logger.debug(`A rota é pública? ${isPublic}`);
      if (isPublic) {
        this.logger.log('--- [FIM DO GUARD] Rota pública, acesso liberado. ---');
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;

      this.logger.debug(`Cabeçalho de autorização recebido: ${authorization}`);
      if (!authorization || !authorization.startsWith('Bearer ')) {
        this.logger.error('Token não encontrado ou mal formatado.');
        throw new UnauthorizedException('Authorization token not found');
      }

      const token = authorization.split(' ')[1];
      this.logger.debug(`Token extraído: ${token}`);

      const decoded = await this.authService.checkToken(token);
      this.logger.debug(
        `Payload decodificado do token: ${JSON.stringify(decoded, null, 2)}`,
      );

      if (!decoded || !decoded.user) {
        this.logger.error('Token inválido ou expirado.');
        throw new UnauthorizedException('Invalid or expired token');
      }

      this.logger.debug(
        `Verificando e-mail do usuário: ${decoded.user.email_verified}`,
      );
      if (!decoded.user.email_verified) {
        this.logger.error('E-mail do usuário não verificado.');
        throw new BadRequestException('User not verified!');
      }

      request['user'] = decoded.user;

      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      this.logger.debug(
        `Roles (strings) necessárias para esta rota: ${JSON.stringify(
          requiredRoles,
        )}`,
      );

      if (!requiredRoles || requiredRoles.length === 0) {
        this.logger.log(
          '--- [FIM DO GUARD] Rota não requer roles, acesso liberado. ---',
        );
        return true;
      }

      const userRole = decoded.user.type;
      this.logger.debug(`Role (string) do usuário no token: ${userRole}`);

      if (!userRole) {
        this.logger.error('Role do usuário não encontrada no token.');
        throw new ForbiddenException('User role could not be determined.');
      }

      const hasPermission = requiredRoles.some((role) => userRole === role);
      this.logger.debug(`O usuário tem a permissão necessária? ${hasPermission}`);

      if (!hasPermission) {
        this.logger.error('Usuário não tem a role necessária.');
        throw new ForbiddenException('Forbidden resource');
      }

      this.logger.log(
        '--- [FIM DO GUARD] Verificações completas, acesso liberado. ---',
      );
      return true;
    } catch (error) {
      this.logger.error(
        `--- [ERRO NO GUARD] Exceção capturada: ${error.message} ---`,
      );
      throw error;
    }
  }
}
