
import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from '../../application/usuarios/usuarios.service';
import { IUsuarioRepository } from 'src/domain/usuarios/repositories/IUsuarioRepository';
import { PrismaUsuarioRepository } from 'src/infra/prisma/usuarios/repositories/PrismaUsuarioRepository';

@Module({
  imports: [],
  controllers: [UsuariosController],
  providers: [
    UsuariosService,
    {
      provide: IUsuarioRepository,
      useClass: PrismaUsuarioRepository,
    },
  ],
  exports: [UsuariosService],
})
export class UsuariosModule {}