import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { ItemRepository } from '../repository/item.repository';
import {
  Item,
  ListItemUsecaseInput,
} from '../interfaces/list-item.usecase.interface';

@Injectable()
export class ListItemUsecase implements IUseCase<ListItemUsecaseInput, Item[]> {
  constructor(
    @Inject(ItemRepository) private readonly itemRepository: ItemRepository,
  ) {}
  async execute(input: ListItemUsecaseInput): Promise<Item[]> {
    return await this.itemRepository.findBy(input);
  }
}
