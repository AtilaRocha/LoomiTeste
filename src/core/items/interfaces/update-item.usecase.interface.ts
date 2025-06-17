export interface UpdateItemUsecaseInput {
  quantity: number;
  subtotal: number;
}

export interface UpdateItemUsecaseOutput extends UpdateItemUsecaseInput {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
  created_at: Date;
  updated_at: Date;
}
