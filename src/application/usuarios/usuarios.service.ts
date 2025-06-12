import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUsuarioRepository } from 'src/domain/usuarios/repositories/IUsuarioRepository';
import { CreateUsuarioDto } from 'src/presentation/usuarios/dto/create-usuario.dto';
import { UpdateUsuarioDto } from 'src/presentation/usuarios/dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject(IUsuarioRepository)
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, 10);
    const dtoComSenhaHasheada = {
      ...createUsuarioDto,
      senha: hashedPassword,
    };
    return this.usuarioRepository.create(dtoComSenhaHasheada);
  }

  async findAll() {
    return this.usuarioRepository.findAll();
  }

  async findById(id: string) {
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) {
      throw new NotFoundException(`Usuário com o ID '${id}' não encontrado.`);
    }
    return usuario;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findById(id);

    if (updateUsuarioDto.senha) {
      updateUsuarioDto.senha = await bcrypt.hash(updateUsuarioDto.senha, 10);
    }

    return this.usuarioRepository.update(id, updateUsuarioDto);
  }

  async remove(id: string) {
    await this.findById(id);
    return this.usuarioRepository.remove(id);
  }

  async findByEmail(email: string) {
    return this.usuarioRepository.findByEmail(email);
  }
}
