export interface UpdateProductApplicationInput {
  name?: string;
  description?: string;
  price?: number;
  quantity_stock?: number;
}

export interface UpdateProductApplicationOutput {
  message: string;
}
