import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { PrismaUsuarioRepository } from 'src/infra/prisma/usuarios/repositories/PrismaUsuarioRepository';
import { IUsuarioRepository } from 'src/domain/usuarios/repositories/IUsuarioRepository';

@Module({
  providers: [
    UsuariosService,
    {
      provide: IUsuarioRepository,
      useClass: PrismaUsuarioRepository,
    },
  ],
  exports: [UsuariosService],
})
export class UsuariosAppModule {}
