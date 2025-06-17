export interface CreateProductUsecaseInput {
  name: string;
  description: string;
  price: number;
  quantity_stock: number;
}

export interface CreateProductUsecaseOutput extends CreateProductUsecaseInput {
  id: number;
  created_at: Date;
  updated_at: Date;
}
