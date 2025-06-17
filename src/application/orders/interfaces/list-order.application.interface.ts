import { Order, OrderStatus, Product, Item, Client } from '@prisma/client';

export interface ListOrderApplicationInput {
  status?: OrderStatus;
  client_id?: number;
  total?: number;
}

export type OrderWithRelations = Order & {
  client: Client;
  items: (Item & { product: Product })[];
};

export interface ListOrderApplicationOutput {
  orders: OrderWithRelations[];
}
