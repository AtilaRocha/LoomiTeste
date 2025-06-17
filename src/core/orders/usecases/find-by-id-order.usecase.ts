import { Inject, Injectable } from '@nestjs/common';

import { IUseCase } from 'src/core/interfaces/IUsecase';
import { OrderRepository } from '../repository/order.repository';
import {
  FindByIdOrderUsecaseInput,
  FindByIdOrderUsecaseOutput,
} from '../interfaces/find-by-id.interface.usecase';

@Injectable()
export class FindByIdOrderUsecase
  implements IUseCase<FindByIdOrderUsecaseInput, FindByIdOrderUsecaseOutput>
{
  constructor(
    @Inject(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}
  async execute(
    input: FindByIdOrderUsecaseInput,
  ): Promise<FindByIdOrderUsecaseOutput> {
    return await this.orderRepository.findById(input.id);
  }
}
