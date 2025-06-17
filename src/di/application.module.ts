import { Module, Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import * as bcrypt from 'bcrypt';

import { CoreModule } from './core.module';
import { AuthModule } from '../presentation/auth/auth.module';

import { CreateUserApplication } from 'src/application/users/create-user.application';
import { ActivedAccountApplication } from 'src/application/users/actived-account.application';
import { LoginUserApplication } from 'src/application/users/login-user.application';
import { FindByIdUserApplication } from 'src/application/users/find-by-id-user.application';
import { DeleteUserApplication } from 'src/application/users/delete-user.application';
import { UpdateUserApplication } from 'src/application/users/update-user.application';
import { ListUserApplication } from 'src/application/users/list-user.application';
import { CreateClientApplication } from 'src/application/clients/create-client.application';
import { FindByIdClientApplication } from 'src/application/clients/find-by-id-client.application';
import { UpdateClientApplication } from 'src/application/clients/update-client.application';
import { DeleteClientApplication } from 'src/application/clients/delete-client.application';
import { ListClientApplication } from 'src/application/clients/list-client.application';
import { CreateProductApplication } from 'src/application/products/create-product.application';
import { ListProductApplication } from 'src/application/products/list-product.application';
import { FindByIdProductApplication } from 'src/application/products/find-by-id-product.application';
import { UpdateProductApplication } from 'src/application/products/update-product.application';
import { DeleteProductApplication } from 'src/application/products/delete-product.application';
import { CreateOrderApplication } from 'src/application/orders/create-order.application';
import { AddItemApplication } from 'src/application/items/add-item.application';
import { RemoveItemApplication } from 'src/application/items/remove-item.application';
import { UpdateItemApplication } from 'src/application/items/update-item.application';
import { UpdateOrderStatusApplication } from 'src/application/orders/update-order-status.application';
import { PaymentApplication } from 'src/application/payments/payment.application';
import { ListOrderApplication } from 'src/application/orders/list-order.application';
import { DeleteOrderApplication } from 'src/application/orders/delete-order.application';
import { ListItemApplication } from 'src/application/items/list-item.application';
import { FindByIdItemApplication } from 'src/application/items/find-by-id-item.application';
import { GenerateFileApplication } from 'src/application/file/generate-file.application';

import { Bcrypt } from 'src/presentation/guard/bcrypt';
import { RolesGuard } from 'src/presentation/guard/roles.guard';
import { SendgridEmailService } from 'src/infra/mail/service/sendgrid-email.service';

const applicationProviders: Provider[] = [
  CreateUserApplication,
  ActivedAccountApplication,
  LoginUserApplication,
  FindByIdUserApplication,
  DeleteUserApplication,
  UpdateUserApplication,
  ListUserApplication,
  CreateClientApplication,
  FindByIdClientApplication,
  UpdateClientApplication,
  DeleteClientApplication,
  ListClientApplication,
  CreateProductApplication,
  ListProductApplication,
  FindByIdProductApplication,
  UpdateProductApplication,
  DeleteProductApplication,
  CreateOrderApplication,
  AddItemApplication,
  RemoveItemApplication,
  UpdateItemApplication,
  UpdateOrderStatusApplication,
  PaymentApplication,
  ListOrderApplication,
  DeleteOrderApplication,
  ListItemApplication,
  FindByIdItemApplication,
  GenerateFileApplication,
  Bcrypt,
  SendgridEmailService,
  {
    provide: 'bcrypt',
    useValue: bcrypt,
  },
];

@Module({
  imports: [CoreModule, AuthModule],
  providers: [
    ...applicationProviders,
    RolesGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: applicationProviders,
})
export class ApplicationModule {}
