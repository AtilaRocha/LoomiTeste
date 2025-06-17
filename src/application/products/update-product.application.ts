import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindByIdProductUsecase } from 'src/core/products/usecases/find-by-product.usecase';
import { FindByIdProductApplicationInput } from './interfaces/find-by-id-product.application.interface';
import {
  UpdateProductApplicationInput,
  UpdateProductApplicationOutput,
} from './interfaces/update-product.application.interface';
import { UpdateProductUsecase } from 'src/core/products/usecases/update-product.usecase';

@Injectable()
export class UpdateProductApplication {
  constructor(
    @Inject(UpdateProductUsecase)
    private updateProductUseCase: UpdateProductUsecase,
    @Inject(FindByIdProductUsecase)
    private findByIdProductUseCase: FindByIdProductUsecase,
  ) {}
  async execute(
    param: FindByIdProductApplicationInput,
    input: UpdateProductApplicationInput,
  ): Promise<UpdateProductApplicationOutput> {
    try {
      const product = await this.findByIdProductUseCase.execute(param);
      if (!product?.id) {
        throw new BadRequestException('Product not found!');
      }
      const keysToCheck = Object.keys(input);
      const isAnyKeyPresent = keysToCheck.some((key) => key in product);
      if (!isAnyKeyPresent)
        throw new BadRequestException('Not field to update');

      await this.updateProductUseCase.execute({ id: product.id, ...input });
      return { message: 'Product updated!' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
