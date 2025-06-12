import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { Cliente } from '@prisma/client';
import { IClienteRepository } from 'src/domain/clientes/repositories/IClienteRepository';
import { CreateClienteDto } from 'src/presentation/clientes/dto/create-cliente.dto';

@Injectable()
export class PrismaClienteRepository implements IClienteRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateClienteDto & { usuarioId: string },
  ): Promise<Cliente> {
    // A propriedade `usuarioId` já está incluída no objeto `data`
    // que é passado pelo ClientesService.
    return this.prisma.cliente.create({
      data: {
        nomeCompleto: data.nomeCompleto,
        contato: data.contato,
        endereco: data.endereco,
        usuario: {
          connect: {
            id: data.usuarioId,
          },
        },
      },
    });
  }

  async findAll(): Promise<Cliente[]> {
    return this.prisma.cliente.findMany({
      include: {
        // Inclui os dados do usuário associado, se quiser
        usuario: true,
      },
    });
  }

  async findById(id: string): Promise<Cliente | null> {
    return this.prisma.cliente.findUnique({
      where: { id },
      include: {
        usuario: true,
      },
    });
  }

}