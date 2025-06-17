import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { DeleteOrderUsecaseInput } from '../interfaces/delete-order.usecase.interface';
import { OrderRepository } from '../repository/order.repository';

@Injectable()
export class DeleteOrderUsecase
  implements IUseCase<DeleteOrderUsecaseInput, void>
{
  constructor(
    @Inject(OrderRepository) private readonly _orderRepository: OrderRepository,
  ) {}
  async execute(input: DeleteOrderUsecaseInput): Promise<void> {
    await this._orderRepository.delete(input.id);
  }
}
