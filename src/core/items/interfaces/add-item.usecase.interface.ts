export interface AddItemUsecaseInput {
  order_id: number;
  product_id: number;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
}

export interface AddItemUsecaseOutput {
  subtotal: number;
}
