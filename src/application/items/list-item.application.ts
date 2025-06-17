import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ListItemApplicationInput,
  ListItemApplicationOutput,
} from './interfaces/list-item.application.interface';
import { ListItemUsecase } from 'src/core/items/usecases/list-item.usecase';

@Injectable()
export class ListItemApplication {
  constructor(
    @Inject(ListItemUsecase) private listItemUseCase: ListItemUsecase,
  ) {}
  async execute(
    input: ListItemApplicationInput,
  ): Promise<ListItemApplicationOutput> {
    try {
      const items = await this.listItemUseCase.execute(input);
      return { items: items };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
