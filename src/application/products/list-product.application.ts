import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ListProductApplicationInput,
  ListProductApplicationOutput,
} from './interfaces/list-product.application.interface';
import { ListProductUsecase } from 'src/core/products/usecases/list-product.usecase';

@Injectable()
export class ListProductApplication {
  constructor(
    @Inject(ListProductUsecase) private listProductUseCase: ListProductUsecase,
  ) {}
  async execute(
    input: ListProductApplicationInput,
  ): Promise<ListProductApplicationOutput> {
    try {
      const products = await this.listProductUseCase.execute(input);

      return { products: products };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
