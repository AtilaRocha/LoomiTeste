export interface ListItemApplicationInput {
  order_id?: number;
  product_id?: number;
  quantity?: number;
  price_per_unit?: number;
  subtotal?: number;
}

export interface Item {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
  created_at: Date;
  updated_at: Date;
}

export interface ListItemApplicationOutput {
  items: Item[];
}
