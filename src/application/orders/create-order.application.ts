import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateOrderApplicationInput,
  CreateOrderApplicationOutput,
} from './interfaces/create-order.application.interface';
import { CreateOrderUsecase } from 'src/core/orders/usecases/create-order.usecase';
import { UpdateOrderUsecase } from 'src/core/orders/usecases/update-order.usecase';
import { FindByIdProductUsecase } from 'src/core/products/usecases/find-by-product.usecase';
import { AddItemUsecase } from 'src/core/items/usecases/add-item.usecase';

@Injectable()
export class CreateOrderApplication {
  constructor(
    @Inject(CreateOrderUsecase)
    private createOrderUseCase: CreateOrderUsecase,
    @Inject(UpdateOrderUsecase)
    private updateOrderUseCase: UpdateOrderUsecase,
    @Inject(AddItemUsecase)
    private addItemUseCase: AddItemUsecase,
    @Inject(FindByIdProductUsecase)
    private findByIdProductUsecase: FindByIdProductUsecase,
  ) {}
  async execute(
    input: CreateOrderApplicationInput,
    client_id: number,
  ): Promise<CreateOrderApplicationOutput> {
    const foundProducts = [];
    try {
      for (const product of input.products) {
        const productExists = await this.findByIdProductUsecase.execute({
          id: product.product_id,
        });

        if (!productExists?.id) {
          throw new NotFoundException('PRODUCT NOT FOUND!');
        }
        if (product.quantity > productExists.quantity_stock) {
          throw new NotFoundException('OUT OF STOCK!');
        }
        foundProducts.push({
          id: productExists.id,
          quantity: product.quantity,
          price: productExists.price,
        });
      }
      const order = await this.createOrderUseCase.execute({
        client_id,
        total: 0,
      });
      let total = 0;
      for (const product of foundProducts) {
        const item = await this.addItemUseCase.execute({
          ...product,
          product_id: product.id,
          order_id: order.id,
          price_per_unit: product.price,
          subtotal: product.price * product.quantity,
        });
        total += item.subtotal;
      }
      await this.updateOrderUseCase.execute({ id: order.id, total: total });
      return { message: 'ORDER PLACED SUCESSFULLY!' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
