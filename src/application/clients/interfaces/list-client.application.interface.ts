export interface ListClientApplicationInput {
  full_name?: string;
  contact?: string;
  address?: string;
}

export interface Client {
  id: number;
  full_name: string;
  contact: string;
  address: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ListClientApplicationOutput {
  clients: Client[];
}
