import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FindByIdOrderUsecase } from 'src/core/orders/usecases/find-by-id-order.usecase';
import { DeleteOrderApplicationInput } from './interfaces/delete-order.application.interface';
import { DeleteOrderUsecase } from 'src/core/orders/usecases/delete-order.usecase';

@Injectable()
export class DeleteOrderApplication {
  constructor(
    @Inject(DeleteOrderUsecase)
    private deleteOrderUseCase: DeleteOrderUsecase,
    @Inject(FindByIdOrderUsecase)
    private findByIdOrderUseCase: FindByIdOrderUsecase,
  ) {}
  async execute(
    input: DeleteOrderApplicationInput,
  ): Promise<Record<string, any>> {
    try {
      const order = await this.findByIdOrderUseCase.execute(input);
      if (!order?.id) {
        throw new NotFoundException('User not found');
      }
      await this.deleteOrderUseCase.execute({ id: order.id });
      return { message: 'order deleted!' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
