import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import {
  CreateOrderUsecaseInput,
  CreateOrderUsecaseOutput,
} from '../interfaces/create-order.usecase.interface';
import { OrderRepository } from '../repository/order.repository';
import { OrderStatus } from 'src/shared/order-status.enum';

@Injectable()
export class CreateOrderUsecase
  implements IUseCase<CreateOrderUsecaseInput, CreateOrderUsecaseOutput>
{
  constructor(
    @Inject(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(
    input: CreateOrderUsecaseInput,
  ): Promise<CreateOrderUsecaseOutput> {
    const order = await this.orderRepository.create({
      client: { connect: { id: input.client_id } },
      total: input.total,
      status: input.status,
      order_date: input.order_date,
    });

    return {
      id: order.id,
      client_id: order.client_id,
      total: order.total,
      status: order.status as OrderStatus,
      order_date: order.order_date,
      updated_at: order.updated_at,
      created_at: order.created_at,
    };
  }
}
