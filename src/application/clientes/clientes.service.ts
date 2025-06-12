// src/application/clientes/clientes.service.ts

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IClienteRepository } from 'src/domain/clientes/repositories/IClienteRepository';
import { IUsuarioRepository } from 'src/domain/usuarios/repositories/IUsuarioRepository';
import { CreateClienteDto } from 'src/presentation/clientes/dto/create-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @Inject(IClienteRepository)
    private readonly clienteRepository: IClienteRepository,
    @Inject(IUsuarioRepository)
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  async create(createClienteDto: CreateClienteDto, usuarioId: string) {
    const usuario = await this.usuarioRepository.findById(usuarioId);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const clienteData = {
      ...createClienteDto,
      usuarioId: usuarioId,
    };

    return this.clienteRepository.create(clienteData);
  }
}
