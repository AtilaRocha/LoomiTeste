export interface Product {
  product_id: number;
  quantity: number;
}

export interface CreateOrderApplicationInput {
  products: Product[];
}

export interface CreateOrderApplicationOutput {
  message: string;
}
