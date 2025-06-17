import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  UpdateOrderStatusApplicationInput,
  UpdateOrderStatusApplicationOutput,
} from './interfaces/update-order-status.application.interface';
import { UpdateOrderStatusUsecase } from 'src/core/orders/usecases/update-order-status.usecase';
import { FindByIdOrderApplicationInput } from './interfaces/find-by-id-order.application.interface';
import { FindByIdOrderUsecase } from 'src/core/orders/usecases/find-by-id-order.usecase';
import { OrderStatus } from 'src/shared/order-status.enum';

@Injectable()
export class UpdateOrderStatusApplication {
  constructor(
    @Inject(UpdateOrderStatusUsecase)
    private updateOrderStatusUsecase: UpdateOrderStatusUsecase,
    @Inject(FindByIdOrderUsecase)
    private findByIdOrderUsecase: FindByIdOrderUsecase,
  ) {}
  async execute(
    param: FindByIdOrderApplicationInput,
    input: UpdateOrderStatusApplicationInput,
  ): Promise<UpdateOrderStatusApplicationOutput> {
    try {
      const order = await this.findByIdOrderUsecase.execute(param);
      if (!order?.id) {
        throw new BadRequestException('Order not found!');
      }
      await this.updateOrderStatusUsecase.execute({
        id: +param.id,
        status: OrderStatus[input.status],
      });
      return { message: 'Order updated!' };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
