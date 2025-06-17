import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  AddItemApplicationInput,
  AddItemApplicationOutput,
} from './interfaces/add-item.application.interface';
import { AddItemUsecase } from 'src/core/items/usecases/add-item.usecase';
import { FindByIdProductUsecase } from 'src/core/products/usecases/find-by-product.usecase';
import { FindByIdOrderUsecase } from 'src/core/orders/usecases/find-by-id-order.usecase';
import { UpdateOrderUsecase } from 'src/core/orders/usecases/update-order.usecase';
import { ListItemUsecase } from 'src/core/items/usecases/list-item.usecase';
import { OrderStatus } from 'src/shared/order-status.enum';

@Injectable()
export class AddItemApplication {
  constructor(
    @Inject(AddItemUsecase)
    private addItemUseCase: AddItemUsecase,
    @Inject(FindByIdProductUsecase)
    private findByIdProductUsecase: FindByIdProductUsecase,
    @Inject(FindByIdOrderUsecase)
    private findByIdOrderUsecase: FindByIdOrderUsecase,
    @Inject(UpdateOrderUsecase)
    private updateOrderUseCase: UpdateOrderUsecase,
    @Inject(ListItemUsecase)
    private listItemUsecase: ListItemUsecase,
  ) {}
  async execute(
    input: AddItemApplicationInput,
  ): Promise<AddItemApplicationOutput> {
    try {
      const productExists = await this.findByIdProductUsecase.execute({
        id: input.product_id,
      });
      if (!productExists?.id) {
        throw new NotFoundException('PRODUCT NOT FOUND!');
      }
      if (input.quantity > productExists.quantity_stock) {
        throw new NotFoundException('OUT OF STOCK!');
      }
      const item = await this.listItemUsecase.execute({
        order_id: input.order_id,
        product_id: input.product_id,
      });
      if (item.length === 1) {
        throw new NotFoundException('ITEM ALREADY IN CART!');
      }
      const subtotal = productExists.price * input.quantity;
      await this.addItemUseCase.execute({
        product_id: input.product_id,
        order_id: input.order_id,
        quantity: input.quantity,
        price_per_unit: productExists.price,
        subtotal: subtotal,
      });
      const order = await this.findByIdOrderUsecase.execute({
        id: input.order_id,
      });
      if (!order?.id) {
        throw new NotFoundException('Order not found!');
      }
      if (order.status != OrderStatus.received) {
        throw new BadRequestException(`Order already ${order.status}`);
      }
      await this.updateOrderUseCase.execute({
        id: input.order_id,
        total: order.total + subtotal,
      });
      return { message: 'Item added!' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
