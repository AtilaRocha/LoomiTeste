import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ClientesModule } from './clientes/clientes.module';
import { ProdutosModule } from './produtos/produtos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { RelatoriosModule } from './relatorios/relatorios.module';

@Module({
  imports: [PrismaModule, UsuariosModule, ClientesModule, ProdutosModule, PedidosModule, RelatoriosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
