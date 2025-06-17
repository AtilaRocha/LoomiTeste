import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from 'src/core/interfaces/IUsecase';
import { RemoveItemUsecaseInput } from '../interfaces/remove-item.usecase.interface';
import { ItemRepository } from '../repository/item.repository';

@Injectable()
export class RemoveItemUsecase
  implements IUseCase<RemoveItemUsecaseInput, void>
{
  constructor(
    @Inject(ItemRepository) private readonly _itemRepository: ItemRepository,
  ) {}
  async execute(input: RemoveItemUsecaseInput): Promise<void> {
    await this._itemRepository.delete(input.id);
  }
}
