import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosAppModule } from 'src/application/usuarios/usuarios.module';

@Module({
  imports: [UsuariosAppModule],
  controllers: [UsuariosController],
})
export class UsuariosModule {}
