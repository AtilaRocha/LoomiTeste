import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';

import {
  UpdateItemUsecaseInput,
  UpdateItemUsecaseOutput,
} from '../interfaces/update-item.usecase.interface';
import { ItemRepository } from '../repository/item.repository';

@Injectable()
export class UpdateItemUsecase
  implements IUseCase<UpdateItemUsecaseInput, UpdateItemUsecaseOutput>
{
  constructor(
    @Inject(ItemRepository)
    private readonly _itemRepository: ItemRepository,
  ) {}
  async execute(
    input: UpdateItemUsecaseInput & { id: number },
  ): Promise<UpdateItemUsecaseOutput> {
    const id = input.id;
    return await this._itemRepository.update(id, input);
  }
}
