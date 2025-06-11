import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './infra/prisma/prisma.module';
import { AuthModule } from './infra/auth/auth.module';

import { UsuariosModule } from './presentation/usuarios/usuarios.module';
import { ClientesModule } from './presentation/clientes/clientes.module';
import { ProdutosModule } from './presentation/produtos/produtos.module';
import { PedidosModule } from './presentation/pedidos/pedidos.module';
import { RelatoriosModule } from './presentation/relatorios/relatorios.module';
import { RelatoriosService } from './application/relatorios/relatorios.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    AuthModule,

    UsuariosModule,
    ClientesModule,
    ProdutosModule,
    PedidosModule,
    RelatoriosModule,
  ],
  controllers: [],
  providers: [RelatoriosService],
})
export class AppModule {}
