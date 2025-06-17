import { Module } from '@nestjs/common';
import { ApplicationModule } from './application.module';
import { UserController } from 'src/presentation/v1/http/users/controller/user.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/presentation/guard/roles.guard';
import { ClientController } from 'src/presentation/v1/http/clients/controller/client.controller';
import { HttpContext } from 'src/presentation/guard/http.context';
import { ProductController } from 'src/presentation/v1/http/products/controller/product.controller';
import { OrderController } from 'src/presentation/v1/http/orders/controller/order.controller';
import { ItemController } from 'src/presentation/v1/http/itens/controller/item.controller';
import { PaymentController } from 'src/presentation/v1/http/payments/controller/payment.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [
    UserController,
    ClientController,
    ProductController,
    OrderController,
    ItemController,
    PaymentController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    HttpContext,
  ],
})
export class PresentationModule {}
