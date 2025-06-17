import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import {
  CreateOrderUsecaseInput,
  CreateOrderUsecaseOutput,
} from '../interfaces/create-order.usecase.interface';
import { OrderRepository } from '../repository/order.repository';

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
    });

    return {
      id: order.id,
      client_id: order.client_id,
      total: order.total,
      status: order.status,
      order_date: order.order_date,
      updated_at: order.updated_at,
    };
  }
}
