import type { Item, Prisma } from '@prisma/client';

export class ProductEntity {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity_stock: number;
  created_at: Date;
  updated_at: Date;

  items?: Item[];

  constructor(input: Partial<ProductEntity>) {
    Object.assign(this, input);
  }
}
