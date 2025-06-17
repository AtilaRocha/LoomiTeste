import { Inject, Injectable } from '@nestjs/common';

import { IUseCase } from 'src/core/interfaces/IUsecase';
import { OrderRepository } from '../repository/order.repository';
import { UpdateOrderUsecaseInput } from '../interfaces/update-order.usecase.interface';

@Injectable()
export class UpdateOrderUsecase
  implements IUseCase<UpdateOrderUsecaseInput, void>
{
  constructor(
    @Inject(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}
  async execute(input: UpdateOrderUsecaseInput): Promise<void> {
    await this.orderRepository.update(input.id, { ...input });
  }
}
