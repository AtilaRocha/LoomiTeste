import { Cliente } from '@prisma/client';
import { CreateClienteDto } from 'src/presentation/clientes/dto/create-cliente.dto';

export const IClienteRepository = Symbol('IClienteRepository');

export interface IClienteRepository {
  create(data: CreateClienteDto): Promise<Cliente>;
  // Defina os outros métodos do CRUD aqui...
}
