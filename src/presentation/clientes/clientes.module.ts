import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { ClientesService } from '../../application/clientes/clientes.service';
import { IClienteRepository } from 'src/domain/clientes/repositories/IClienteRepository';
import { PrismaClienteRepository } from 'src/infra/prisma/clientes/repositories/PrismaClienteRepository';
import { IUsuarioRepository } from 'src/domain/usuarios/repositories/IUsuarioRepository';
import { PrismaUsuarioRepository } from 'src/infra/prisma/usuarios/repositories/PrismaUsuarioRepository';

@Module({
  controllers: [ClientesController],
  providers: [
    ClientesService,
    {
      provide: IClienteRepository,
      useClass: PrismaClienteRepository,
    },
    {
      provide: IUsuarioRepository,
      useClass: PrismaUsuarioRepository,
    },
  ],
})
export class ClientesModule {}