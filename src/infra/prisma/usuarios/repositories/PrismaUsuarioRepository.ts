import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { IUsuarioRepository } from 'src/domain/usuarios/repositories/IUsuarioRepository';
import { Usuario } from '@prisma/client';
import { UpdateUsuarioDto } from 'src/presentation/usuarios/dto/update-usuario.dto';

@Injectable()
export class PrismaUsuarioRepository implements IUsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    nome: string;
    email: string;
    senha: string;
  }): Promise<Usuario> {
    return this.prisma.usuario.create({ data });
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  async findAll(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  async findById(id: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { id } });
  }
  async update(id: string, data: Partial<UpdateUsuarioDto>): Promise<Usuario> {
    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.usuario.delete({
      where: { id },
    });
  }
}
