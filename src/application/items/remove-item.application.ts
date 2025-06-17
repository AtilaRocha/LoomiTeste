import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  RemoveItemApplicationInput,
  RemoveItemApplicationOutput,
} from './interfaces/remove-item.application.interface';
import { FindByIdOrderUsecase } from 'src/core/orders/usecases/find-by-id-order.usecase';
import { FindByIdItemUsecase } from 'src/core/items/usecases/find-by-id-item.usecase';
import { RemoveItemUsecase } from 'src/core/items/usecases/remove-item.usecase';
import { UpdateOrderUsecase } from 'src/core/orders/usecases/update-order.usecase';

@Injectable()
export class RemoveItemApplication {
  constructor(
    @Inject(RemoveItemUsecase)
    private removeItemUseCase: RemoveItemUsecase,
    @Inject(FindByIdOrderUsecase)
    private findByIdOrderUsecase: FindByIdOrderUsecase,
    @Inject(FindByIdItemUsecase)
    private findByIdItemUsecase: FindByIdItemUsecase,
    @Inject(UpdateOrderUsecase)
    private updateOrderUsecase: UpdateOrderUsecase,
  ) {}
  async execute(
    input: RemoveItemApplicationInput,
  ): Promise<RemoveItemApplicationOutput> {
    try {
      const item = await this.findByIdItemUsecase.execute({
        id: input.id,
      });
      if (!item?.id) {
        throw new NotFoundException('Item not found!');
      }
      await this.removeItemUseCase.execute({ id: item.id });
      const order = await this.findByIdOrderUsecase.execute({
        id: item.order_id,
      });
      const subtotal = item.subtotal;
      await this.updateOrderUsecase.execute({
        id: order.id,
        total: order.total - subtotal,
      });
      return { message: 'Item removed!' };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
