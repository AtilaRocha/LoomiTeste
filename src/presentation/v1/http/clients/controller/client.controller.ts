import {
  Body,
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
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateClientApplication } from 'src/application/clients/create-client.application';
import { UpdateClientApplication } from 'src/application/clients/update-client.application';
import { FindByIdClientApplication } from 'src/application/clients/find-by-id-client.application';
import { DeleteClientApplication } from 'src/application/clients/delete-client.application';
import { ListClientApplication } from 'src/application/clients/list-client.application';

import {
  CreateClientDtoInput,
  CreateClientDtoOutput,
} from '../dto/create-client.dto';
import {
  UpdateClientDtoInput,
  UpdateClientDtoOutput,
} from '../dto/update-client.dto';
import {
  ListClientDtoInput,
  ListClientDtoOutput,
} from '../dto/list-client.dto';
import { ClientUserHttpDtoInput } from '../dto/user-http-context.dto';

import { Roles } from 'src/presentation/roles.decorator';
import { Role } from 'src/presentation/enum/role.enum';
import { RolesGuard } from 'src/presentation/guard/roles.guard';
import { createPipe } from 'src/shared/utils/create-pipe';
import { HttpContext } from 'src/presentation/guard/http.context';

@Controller('clients')
@ApiTags('Clients')
@ApiBearerAuth('token')
export class ClientController {
  constructor(
    @Inject(CreateClientApplication)
    private createClientApplication: CreateClientApplication,
    @Inject(UpdateClientApplication)
    private updateClientApplication: UpdateClientApplication,
    @Inject(FindByIdClientApplication)
    private findByIdClientApplication: FindByIdClientApplication,
    @Inject(DeleteClientApplication)
    private deleteClientApplication: DeleteClientApplication,
    @Inject(ListClientApplication)
    private listClientApplication: ListClientApplication,
    @Inject(HttpContext) protected readonly httpContext: HttpContext,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Client)
  @UsePipes(createPipe(CreateClientDtoInput))
  @ApiOperation({ summary: 'Cria um novo perfil de cliente' })
  @ApiResponse({
    status: 201,
    description: 'Cliente criado com sucesso.',
    type: CreateClientDtoOutput,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  async create(
    @Req() request: any,
    @Body() input: CreateClientDtoInput,
  ): Promise<CreateClientDtoOutput> {
    const user: ClientUserHttpDtoInput = request?.user;
    return await this.createClientApplication.execute(input, user);
  }

  @Get(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Busca um cliente por ID' })
  @ApiParam({ name: 'id', description: 'ID do cliente', type: Number })
  @ApiResponse({ status: 200, description: 'Dados do cliente.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Record<string, any>> {
    return await this.findByIdClientApplication.execute({ id });
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Lista todos os clientes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes.',
    type: ListClientDtoOutput,
  })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  async list(@Query() input: ListClientDtoInput): Promise<ListClientDtoOutput> {
    return await this.listClientApplication.execute(input);
  }

  @Patch(':id')
  @Roles(Role.Client, Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Atualiza os dados de um cliente' })
  @ApiParam({ name: 'id', description: 'ID do cliente', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Cliente atualizado.',
    type: UpdateClientDtoOutput,
  })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateClientDtoInput,
  ): Promise<UpdateClientDtoOutput> {
    return await this.updateClientApplication.execute({ id }, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Deleta um cliente por ID' })
  @ApiParam({ name: 'id', description: 'ID do cliente', type: Number })
  @ApiResponse({ status: 204, description: 'Cliente deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  @ApiResponse({ status: 403, description: 'Acesso negado.' })
  async deleteClient(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Record<string, any>> {
    return await this.deleteClientApplication.execute({ id });
  }
}
