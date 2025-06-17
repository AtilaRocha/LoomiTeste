import { ClientEntity } from 'src/core/clients/entity/client.entity';
import { ItemEntity } from 'src/core/items/entity/item.entity';
import { OrderStatus } from 'src/shared/order-status.enum';

export class OrderEntity {
  id: number;
  client_id: number;
  status: OrderStatus;
  order_date: Date;
  total: number;
  updated_at: Date;

  client?: ClientEntity;
  item?: ItemEntity[];

  constructor(input: Partial<OrderEntity>) {
    Object.assign(this, input);
  }
}

export function mapPrismaOrderToEntity(order: any): OrderEntity {
  return new OrderEntity({
    id: order.id,
    client_id: order.client_id,
    status: order.status,
    order_date: order.order_date,
    total: Number(order.total),
    updated_at: order.updated_at,
    client: order.client ? new ClientEntity(order.client) : undefined,
    item: order.items
      ? order.items.map((i: any) => new ItemEntity(i))
      : undefined,
  });
}
