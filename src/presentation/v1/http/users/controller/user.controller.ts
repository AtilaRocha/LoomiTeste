import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { CreateUserApplication } from 'src/application/users/create-user.application';
import { ActivedAccountApplication } from 'src/application/users/actived-account.application';
import { LoginUserApplication } from 'src/application/users/login-user.application';
import { DeleteUserApplication } from 'src/application/users/delete-user.application';
import { FindByIdUserApplication } from 'src/application/users/find-by-id-user.application';
import { UpdateUserApplication } from 'src/application/users/update-user.application';
import { ListUserApplication } from 'src/application/users/list-user.application';

import { CreateUserDtoInput, CreateUserDtoOutput } from '../dto/create.dto';
import { ActivedAccountDtoInput } from '../dto/actived-account.dto';
import { LoginUserDtoInput } from '../dto/login.dto';
import { UpdateUserDtoInput } from '../dto/update.dto';
import { ListUserDtoInput, ListUserDtoOutput } from '../dto/list.dto';

import { Public } from 'src/presentation/public.decorator';
import { Roles } from 'src/presentation/roles.decorator';
import { Role } from 'src/presentation/enum/role.enum';
import { UserRole } from 'src/shared/user-role.enum';
import { RolesGuard } from 'src/presentation/guard/roles.guard';
import { createPipe } from 'src/shared/utils/create-pipe';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    @Inject(CreateUserApplication)
    private createUserApplication: CreateUserApplication,
    @Inject(ActivedAccountApplication)
    private activedAccountApplication: ActivedAccountApplication,
    @Inject(LoginUserApplication)
    private loginUserApplication: LoginUserApplication,
    @Inject(DeleteUserApplication)
    private deleteUserApplication: DeleteUserApplication,
    @Inject(FindByIdUserApplication)
    private findByIdUserApplication: FindByIdUserApplication,
    @Inject(UpdateUserApplication)
    private updateUserApplication: UpdateUserApplication,
    @Inject(ListUserApplication)
    private listUserApplication: ListUserApplication,
  ) {}

  @ApiBearerAuth('token')
  @Post('admin')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UsePipes(createPipe(CreateUserDtoInput))
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Cria um novo usuário Administrador' })
  @ApiResponse({
    status: 201,
    description: 'Usuário admin criado.',
    type: CreateUserDtoOutput,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou e-mail já existente.',
  })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  async createAdmin(
    @Req() req: Request,
    @Body() input: CreateUserDtoInput,
  ): Promise<CreateUserDtoOutput> {
    const type = { type: UserRole.ADMIN };
    const combined = { ...input, ...type };
    return await this.createUserApplication.execute(combined, req);
  }

  @Public()
  @Post('client')
  @UsePipes(createPipe(CreateUserDtoInput))
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Cria um novo usuário Cliente' })
  @ApiResponse({
    status: 201,
    description: 'Usuário cliente criado.',
    type: CreateUserDtoOutput,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou e-mail já existente.',
  })
  async createClient(
    @Req() req: Request,
    @Body() input: CreateUserDtoInput,
  ): Promise<CreateUserDtoOutput> {
    const type = { type: UserRole.CLIENT };
    const combined = { ...input, ...type };
    return await this.createUserApplication.execute(combined, req);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(createPipe(LoginUserDtoInput))
  @ApiOperation({ summary: 'Realiza o login de um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Login bem-sucedido.',
    schema: { example: { accessToken: 'jwt.token.aqui' } },
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  async login(@Body() input: LoginUserDtoInput): Promise<Record<string, any>> {
    return await this.loginUserApplication.execute(input);
  }

  @Public()
  @Get(':id/:token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Ativa a conta de um usuário' })
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiParam({
    name: 'token',
    description: 'Token de ativação recebido por e-mail',
  })
  @ApiResponse({ status: 200, description: 'Conta ativada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Token ou ID inválido.' })
  async activeAccount(@Param() input: ActivedAccountDtoInput): Promise<void> {
    await this.activedAccountApplication.execute(input);
  }

  @ApiBearerAuth('token')
  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Busca um usuário por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    type: Number,
    example: 1,
  })
  @ApiResponse({ status: 200, description: 'Dados do usuário.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Record<string, any>> {
    return await this.findByIdUserApplication.execute({ id });
  }

  @ApiBearerAuth('token')
  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Lista todos os usuários com filtros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários.',
    type: ListUserDtoOutput,
  })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  async list(@Query() input: ListUserDtoInput): Promise<ListUserDtoOutput> {
    return await this.listUserApplication.execute(input);
  }

  @ApiBearerAuth('token')
  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Atualiza um usuário por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    type: Number,
    example: 1,
  })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateUserDtoInput,
  ): Promise<Record<string, any>> {
    return await this.updateUserApplication.execute({ id }, input);
  }

  @ApiBearerAuth('token')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Deleta um usuário por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    type: Number,
    example: 1,
  })
  @ApiResponse({ status: 204, description: 'Usuário deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Record<string, any>> {
    return await this.deleteUserApplication.execute({ id });
  }
}
