export interface CreateProductApplicationInput {
  name: string;
  description: string;
  price: number;
  quantity_stock: number;
}

export interface CreateProductApplicationOutput {
  message: string;
}
