import { OrderStatus } from 'src/shared/order-status.enum';

export interface GenerateFileApplicationInput {
  order_date?: {
    gt?: Date;
    gte?: Date;
    lt?: Date;
    lte?: Date;
  };
  updated_at?: {
    gt?: Date;
    gte?: Date;
    lt?: Date;
    lte?: Date;
  };
  status?: OrderStatus;
}
