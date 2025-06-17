import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindByIdItemUsecase } from 'src/core/items/usecases/find-by-id-item.usecase';
import { FindByIdItemApplicationInput } from './interfaces/find-by-id-item.application.interface';

@Injectable()
export class FindByIdItemApplication {
  constructor(
    @Inject(FindByIdItemUsecase)
    private findByIdItemUseCase: FindByIdItemUsecase,
  ) {}
  async execute(
    input: FindByIdItemApplicationInput,
  ): Promise<Record<string, any>> {
    try {
      const item = await this.findByIdItemUseCase.execute(input);
      if (!item?.id) {
        throw new BadRequestException('Item not found');
      }
      return item;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
