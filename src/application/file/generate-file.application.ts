import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ListOrderUsecase } from 'src/core/orders/usecases/list-order.usecase';
import { GenerateFileApplicationInput } from './interface/generate-file.application.interface';

@Injectable()
export class GenerateFileApplication {
  constructor(
    @Inject(ListOrderUsecase)
    private listOrderUsecase: ListOrderUsecase,
  ) {}

  async execute(input: GenerateFileApplicationInput): Promise<any> {
    try {
      const filters: any = { ...input };

      if (input.order_date) {
        filters.order_date = { gt: input.order_date };
      }

      if (input.updated_at) {
        filters.updated_at = { lt: input.updated_at };
      }

      const orders = await this.listOrderUsecase.execute(filters);

      const report = [];

      for (const order of orders) {
        for (const item of order.items || []) {
          report.push({
            'Identificador do Pedido': item.order_id,
            'Identificador do Produto': item.product_id,
            Produto: item.product.name,
            'Quantidade Venda': item.quantity,
            'Preço por unidade': item.price_per_unit,
            Subtotal: item.subtotal,
          });
        }
      }

      return report;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
