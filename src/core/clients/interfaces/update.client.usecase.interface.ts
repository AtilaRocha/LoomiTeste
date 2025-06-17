export interface UpdateClientUsecaseInput {
  full_name?: string;
  contact?: string;
  address?: string;
  status?: boolean;
}

export interface UpdateClientUsecaseOutput extends UpdateClientUsecaseInput {
  id: number;
  userId: number;
  created_at: Date;
  updated_at: Date;
}
