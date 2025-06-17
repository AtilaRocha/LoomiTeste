export interface ListProductUsecaseInput {
  name?: string;
  description?: string;
  price?: number;
  quantity_stock?: number;
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  quantity_stock: number;
  created_at: Date;
  updated_at: Date;
}
