export interface UpdateProductUsecaseInput {
  name?: string;
  description?: string;
  price?: number;
  quantity_stock?: number;
}

export interface UpdateProductUsecaseOutput extends UpdateProductUsecaseInput {
  id: number;
  created_at: Date;
  updated_at: Date;
}
