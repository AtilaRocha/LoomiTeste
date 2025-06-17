// @ts-ignore
import { Item, Order, Product } from '@prisma/client';

export class ItemEntity implements Item {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
  created_at: Date;
  updated_at: Date;

  order?: Order;
  product?: Product;

  constructor(input: Partial<ItemEntity>) {
    Object.assign(this, input);
  }
}
