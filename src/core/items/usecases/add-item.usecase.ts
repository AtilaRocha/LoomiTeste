import { Inject, Injectable } from '@nestjs/common';

import { IUseCase } from 'src/core/interfaces/IUsecase';
import {
  AddItemUsecaseInput,
  AddItemUsecaseOutput,
} from '../interfaces/add-item.usecase.interface';
import { ItemRepository } from '../repository/item.repository';

@Injectable()
export class AddItemUsecase
  implements IUseCase<AddItemUsecaseInput, AddItemUsecaseOutput>
{
  constructor(
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
  ) {}
  async execute(input: AddItemUsecaseInput): Promise<AddItemUsecaseOutput> {
    return await this.itemRepository.save({ ...input });
  }
}
