import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ListOrderApplicationInput,
  ListOrderApplicationOutput,
} from './interfaces/list-order.application.interface';
import { ListOrderUsecase } from 'src/core/orders/usecases/list-order.usecase';

@Injectable()
export class ListOrderApplication {
  constructor(
    @Inject(ListOrderUsecase) private listOrderUseCase: ListOrderUsecase,
  ) {}
  async execute(
    input: ListOrderApplicationInput,
  ): Promise<ListOrderApplicationOutput> {
    try {
      const orders = await this.listOrderUseCase.execute(input);
      return { orders };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
