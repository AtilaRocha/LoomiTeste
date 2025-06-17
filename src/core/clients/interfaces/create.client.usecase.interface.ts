export interface CreateClientUsecaseInput {
  full_name: string;
  contact: string;
  address: string;
  userId: number;
}

export interface CreateClientUsecaseOutput extends CreateClientUsecaseInput {
  id: number;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}
