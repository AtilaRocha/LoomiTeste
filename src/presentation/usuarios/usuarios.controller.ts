import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsuariosService } from 'src/application/usuarios/usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from 'src/infra/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/infra/auth/guards/roles.guard';
import { Roles } from 'src/infra/auth/decorators/role.decorator';
import { TipoUsuario } from '@prisma/client';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário (público).' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TipoUsuario.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lista todos os usuários (somente Admin).' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada.' })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TipoUsuario.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Busca um usuário por ID (somente Admin).' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.usuariosService.findById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TipoUsuario.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza um usuário por ID (somente Admin).' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TipoUsuario.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove um usuário por ID (somente Admin).' })
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }
}