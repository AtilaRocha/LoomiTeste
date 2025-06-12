import { Usuario } from '@prisma/client';
import { CreateUsuarioDto } from 'src/presentation/usuarios/dto/create-usuario.dto';
import { UpdateUsuarioDto } from 'src/presentation/usuarios/dto/update-usuario.dto';

export const IUsuarioRepository = Symbol('IUsuarioRepository');

export interface IUsuarioRepository {
  create(
    data: Omit<CreateUsuarioDto, 'senha'> & { senha: string },
  ): Promise<Usuario>;
  findAll(): Promise<Usuario[]>;
  findById(id: string): Promise<Usuario | null>;
  findByEmail(email: string): Promise<Usuario | null>;
  update(id: string, data: Partial<UpdateUsuarioDto>): Promise<Usuario>;
  remove(id: string): Promise<void>;
}
