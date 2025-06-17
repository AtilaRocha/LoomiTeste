import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  CreateProductApplicationInput,
  CreateProductApplicationOutput,
} from './interfaces/create-product.application.interface';
import { CreateProductUsecase } from 'src/core/products/usecases/create-product.usecase';
import { VerifyProductUsecase } from 'src/core/products/usecases/product-registered.usecase';

@Injectable()
export class CreateProductApplication {
  constructor(
    @Inject(CreateProductUsecase)
    private createProductUseCase: CreateProductUsecase,
    @Inject(VerifyProductUsecase)
    private verifyProductUsecase: VerifyProductUsecase,
  ) {}
  async execute(
    input: CreateProductApplicationInput,
  ): Promise<CreateProductApplicationOutput> {
    try {
      const productAlreadyRegistered = await this.verifyProductUsecase.execute({
        name: input.name,
      });
      if (productAlreadyRegistered) {
        throw new BadRequestException('Product Already Exist!');
      }
      await this.createProductUseCase.execute(input);
      return { message: 'Product created! ' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
