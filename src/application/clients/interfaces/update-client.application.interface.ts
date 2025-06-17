export interface UpdateClientApplicationInput {
  full_name?: string;
  contact?: string;
  address?: string;
  status?: boolean;
}

export interface UpdateClientApplicationOutput {
  message: string;
}
