import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { OrderRepository } from '../repository/order.repository';
import {
  ListOrderUsecaseInput,
  ListOrderUsecaseOutput,
} from '../interfaces/list-order.usecase.interface';

@Injectable()
export class ListOrderUsecase
  implements IUseCase<ListOrderUsecaseInput, ListOrderUsecaseOutput>
{
  constructor(
    @Inject(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}
  async execute(input: ListOrderUsecaseInput): Promise<ListOrderUsecaseOutput> {
    const where = {
      client_id: input.client_id,
      status: input.status,
      total: input.total,
    };

    return await this.orderRepository.findMany(where);
  }
}
