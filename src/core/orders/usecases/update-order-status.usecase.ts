import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { OrderRepository } from '../repository/order.repository';
import { UpdateOrderStatusUsecaseInput } from '../interfaces/update-order-status.usecase.interface';

@Injectable()
export class UpdateOrderStatusUsecase
  implements IUseCase<UpdateOrderStatusUsecaseInput, void>
{
  constructor(
    @Inject(OrderRepository)
    private readonly orderRepository: OrderRepository,
  ) {}
  async execute(input: UpdateOrderStatusUsecaseInput): Promise<void> {
    await this.orderRepository.update(input.id, { ...input });
  }
}
