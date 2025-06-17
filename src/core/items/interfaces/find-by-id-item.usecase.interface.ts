export interface FindByIdItemUsecaseInput {
  id: number;
}

export interface FindByIdItemUsecaseOutput extends FindByIdItemUsecaseInput {
  order_id: number;
  product_id: number;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
}
