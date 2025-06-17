import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/postgres/prisma/prisma.service';
import { ItemEntity } from '../entity/item.entity';

@Injectable()
export class ItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: Partial<ItemEntity>): Promise<ItemEntity> {
    const item = await this.prisma.item.create({
      data: {
        order_id: data.order_id,
        product_id: data.product_id,
        quantity: data.quantity,
        price_per_unit: data.price_per_unit,
        subtotal: data.subtotal,
      },
    });

    return new ItemEntity(item);
  }

  async find(): Promise<ItemEntity[]> {
    const items = await this.prisma.item.findMany({
      include: { product: true },
    });

    return items.map((item) => new ItemEntity(item));
  }

  async findOne(id: number): Promise<ItemEntity | null> {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: { product: true },
    });

    return item ? new ItemEntity(item) : null;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.item.delete({ where: { id } });
  }

  async update(id: number, data: Partial<ItemEntity>): Promise<ItemEntity> {
    const updatedItem = await this.prisma.item.update({
      where: { id },
      data: {
        order_id: data.order_id,
        product_id: data.product_id,
        quantity: data.quantity,
        price_per_unit: data.price_per_unit,
        subtotal: data.subtotal,
      },
      include: { product: true },
    });

    return new ItemEntity(updatedItem);
  }
  async findBy(filter: Partial<ItemEntity>): Promise<ItemEntity[]> {
    const items = await this.prisma.item.findMany({
      where: { ...filter },
      include: { product: true },
    });

    return items.map((item) => new ItemEntity(item));
  }
}
