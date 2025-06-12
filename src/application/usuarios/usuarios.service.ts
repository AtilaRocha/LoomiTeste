import { Inject, Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUsuarioRepository } from 'src/domain/usuarios/repositories/IUsuarioRepository'; // CAMINHO CORRIGIDO
import { CreateUsuarioDto } from 'src/presentation/usuarios/dto/create-usuario.dto'; // CAMINHO CORRIGIDO

@Injectable()
export class UsuariosService {
  constructor(
    @Inject(IUsuarioRepository)
    private readonly usuarioRepository: IUsuarioRepository,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const emailExists = await this.usuarioRepository.findByEmail(
      createUsuarioDto.email,
    );
    if (emailExists) {
      throw new ConflictException('O e-mail já está em uso.');
    }
    const hashedPassword = await bcrypt.hash(createUsuarioDto.senha, 10);
    return this.usuarioRepository.create({
      ...createUsuarioDto,
      senha: hashedPassword,
    });
  }

  async findByEmail(email: string) {
    return this.usuarioRepository.findByEmail(email);
  }

  async findAll() {
    return this.usuarioRepository.findAll();
  }
}
