import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClienteRepository } from 'src/domain/clientes/repositories/IClienteRepository';
import { IUsuarioRepository } from 'src/domain/usuarios/repositories/IUsuarioRepository';
import { CreateClienteDto } from 'src/presentation/clientes/dto/create-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @Inject(IClienteRepository)
    private readonly clienteRepository: IClienteRepository,
    @Inject(IUsuarioRepository) // Injeta o repo de usuário para verificação
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  async create(createClienteDto: CreateClienteDto) {
    // Regra de negócio: O usuário precisa existir para se tornar um cliente
    const usuario = await this.usuarioRepository.findById(
      createClienteDto.usuarioId,
    );
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    // Aqui você pode adicionar outras lógicas, como verificar se o usuário já é um cliente

    return this.clienteRepository.create(createClienteDto);
  }

  // Implemente os outros casos de uso (findAll, findOne, etc.)
}
