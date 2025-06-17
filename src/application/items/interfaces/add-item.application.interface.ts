export interface AddItemApplicationInput {
  order_id: number;
  product_id: number;
  quantity: number;
}

export interface AddItemApplicationOutput {
  message: string;
}
