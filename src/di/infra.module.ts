import { Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaService } from 'src/infra/database/postgres/prisma/prisma.service';

import { UserRepository } from 'src/core/users/repository/user.repository';
import { ClientRepository } from 'src/core/clients/repository/client.repository';
import { ProductRepository } from 'src/core/products/repository/product.repository';
import { ItemRepository } from 'src/core/items/repository/item.repository';
import { OrderRepository } from 'src/core/orders/repository/order.repository';

import { SendgridEmailService } from 'src/infra/mail/service/sendgrid-email.service';

export const infraProviders: Provider[] = [
  PrismaService,
  UserRepository,
  ClientRepository,
  ProductRepository,
  ItemRepository,
  OrderRepository,
  SendgridEmailService,
];

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: parseInt(process.env.JWT_EXPIRATION_TIME, 10),
      },
    }),
  ],
  providers: infraProviders,
  exports: infraProviders,
})
export class InfraModule {}
