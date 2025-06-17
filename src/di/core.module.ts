import { Module, Provider } from '@nestjs/common';
import { CreateUserUsecase } from 'src/core/users/usecases/create-user.usecase';
import { InfraModule } from './infra.module';
import { VerifyEmailUsecase } from 'src/core/users/usecases/verify-email.usecase';
import { ActivedAccountUsecase } from 'src/core/users/usecases/actived-account.usecase';
import { LoginUserUsecase } from 'src/core/users/usecases/login-user.usecase';
import { FindByIdUserUsecase } from 'src/core/users/usecases/find-by-id-user.usecase';
import { DeleteUserUsecase } from 'src/core/users/usecases/delete-user.usecase';
import { CreateClientUsecase } from 'src/core/clients/usecases/create-client.usecase';
import { UpdateUserUsecase } from 'src/core/users/usecases/update-user.usecase';
import { ListUserUsecase } from 'src/core/users/usecases/list-user.usecase';
import { FindByIdClientUsecase } from 'src/core/clients/usecases/find-by-id.client.usecase';
import { UpdateClientUsecase } from 'src/core/clients/usecases/update-client.usecase';
import { DeleteClientUsecase } from 'src/core/clients/usecases/delete-client.usecase';
import { ListClientUsecase } from 'src/core/clients/usecases/list-client.usecase';
import { CreateProductUsecase } from 'src/core/products/usecases/create-product.usecase';
import { VerifyProductUsecase } from 'src/core/products/usecases/product-registered.usecase';
import { ListProductUsecase } from 'src/core/products/usecases/list-product.usecase';
import { FindByIdProductUsecase } from 'src/core/products/usecases/find-by-product.usecase';
import { UpdateProductUsecase } from 'src/core/products/usecases/update-product.usecase';
import { DeleteProductUsecase } from 'src/core/products/usecases/delete-product.usecase';
import { CreateOrderUsecase } from 'src/core/orders/usecases/create-order.usecase';
import { UpdateOrderUsecase } from 'src/core/orders/usecases/update-order.usecase';

import { FindByIdOrderUsecase } from 'src/core/orders/usecases/find-by-id-order.usecase';
import { AddItemUsecase } from 'src/core/items/usecases/add-item.usecase';
import { RemoveItemUsecase } from 'src/core/items/usecases/remove-item.usecase';
import { FindByIdItemUsecase } from 'src/core/items/usecases/find-by-id-item.usecase';
import { UpdateItemUsecase } from 'src/core/items/usecases/update-item.usecase';
import { UpdateOrderStatusUsecase } from 'src/core/orders/usecases/update-order-status.usecase';

import { ListItemUsecase } from 'src/core/items/usecases/list-item.usecase';
import { ListOrderUsecase } from 'src/core/orders/usecases/list-order.usecase';
import { DeleteOrderUsecase } from 'src/core/orders/usecases/delete-order.usecase';
import { PaymentUsecase } from 'src/core/payments/usecases/payment.usecase';

export const coreProviders: Provider[] = [
  CreateUserUsecase,
  ActivedAccountUsecase,
  VerifyEmailUsecase,
  FindByIdUserUsecase,
  UpdateUserUsecase,
  DeleteUserUsecase,
  ListUserUsecase,
  LoginUserUsecase,
  CreateClientUsecase,
  FindByIdClientUsecase,
  UpdateClientUsecase,
  DeleteClientUsecase,
  ListClientUsecase,
  CreateProductUsecase,
  VerifyProductUsecase,
  ListProductUsecase,
  FindByIdProductUsecase,
  UpdateProductUsecase,
  DeleteProductUsecase,
  CreateOrderUsecase,
  UpdateOrderUsecase,
  CreateUserUsecase,
  FindByIdOrderUsecase,
  AddItemUsecase,
  RemoveItemUsecase,
  FindByIdItemUsecase,
  UpdateItemUsecase,
  UpdateOrderStatusUsecase,
  DeleteOrderUsecase,
  ListItemUsecase,
  ListOrderUsecase,
  ListItemUsecase,
  PaymentUsecase,
  FindByIdItemUsecase,
  InfraModule,
];

@Module({
  imports: [InfraModule],
  providers: coreProviders,
  exports: coreProviders,
})
export class CoreModule {}
