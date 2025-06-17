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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Roles } from 'src/presentation/roles.decorator';
import { Role } from 'src/presentation/enum/role.enum';

import { AddItemApplication } from 'src/application/items/add-item.application';
import { RemoveItemApplication } from 'src/application/items/remove-item.application';
import { UpdateItemApplication } from 'src/application/items/update-item.application';
import { ListItemApplication } from 'src/application/items/list-item.application';
import { FindByIdItemApplication } from 'src/application/items/find-by-id-item.application';

import { AddItemDtoInput, AddItemDtoOutput } from '../dto/add-item.dto';
import { RemoveItemDtoOutput } from '../dto/remove-item.dto';
import {
  UpdateItemDtoInput,
  UpdateItemDtoOutput,
} from '../dto/update-item.dto';
import { ListItemDtoInput, ListItemDtoOutput } from '../dto/list-item.dto';

@ApiTags('Items')
@ApiBearerAuth('token')
@Controller('items')
export class ItemController {
  constructor(
    @Inject(AddItemApplication)
    private addItemApplication: AddItemApplication,
    @Inject(RemoveItemApplication)
    private removeItemApplication: RemoveItemApplication,
    @Inject(UpdateItemApplication)
    private updateItemApplication: UpdateItemApplication,
    @Inject(ListItemApplication)
    private listItemApplication: ListItemApplication,
    @Inject(FindByIdItemApplication)
    private findByIdItemApplication: FindByIdItemApplication,
  ) {}

  @Post()
  @Roles(Role.Admin, Role.Client)
  @ApiOperation({ summary: 'Adicionar um novo item a um pedido' })
  @ApiResponse({
    status: 201,
    description: 'O item foi adicionado com sucesso.',
    type: AddItemDtoOutput,
  })
  @ApiResponse({ status: 403, description: 'Forbidden: Acesso negado.' })
  @ApiResponse({ status: 400, description: 'Bad Request: Dados inválidos.' })
  async addItem(@Body() input: AddItemDtoInput): Promise<AddItemDtoOutput> {
    return await this.addItemApplication.execute(input);
  }

  @Get()
  @Roles(Role.Admin, Role.Client)
  @ApiOperation({ summary: 'Listar todos os itens com filtros' })
  @ApiQuery({
    name: 'order_id',
    type: Number,
    required: false,
    description: 'Filtrar itens por ID do pedido',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de itens retornada com sucesso.',
    type: ListItemDtoOutput,
  })
  @ApiResponse({ status: 403, description: 'Forbidden: Acesso negado.' })
  async list(@Query() input: ListItemDtoInput): Promise<ListItemDtoOutput> {
    return await this.listItemApplication.execute(input);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Client)
  @ApiOperation({ summary: 'Encontrar um item pelo seu ID' })
  @ApiParam({ name: 'id', description: 'ID do item a ser buscado' })
  @ApiResponse({ status: 200, description: 'O registro do item encontrado.' })
  @ApiResponse({ status: 404, description: 'Item não encontrado.' })
  @ApiResponse({ status: 403, description: 'Forbidden: Acesso negado.' })
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Record<string, any>> {
    return await this.findByIdItemApplication.execute({ id });
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Client)
  @ApiOperation({ summary: 'Atualizar a quantidade de um item' })
  @ApiParam({ name: 'id', description: 'ID do item a ser atualizado' })
  @ApiResponse({
    status: 200,
    description: 'O item foi atualizado com sucesso.',
    type: UpdateItemDtoOutput,
  })
  @ApiResponse({ status: 404, description: 'Item não encontrado.' })
  @ApiResponse({ status: 403, description: 'Forbidden: Acesso negado.' })
  async updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateItemDtoInput,
  ): Promise<UpdateItemDtoOutput> {
    return await this.updateItemApplication.execute({ id }, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.Admin, Role.Client)
  @ApiOperation({ summary: 'Remover um item de um pedido' })
  @ApiParam({ name: 'id', description: 'ID do item a ser removido' })
  @ApiResponse({ status: 204, description: 'O item foi removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Item não encontrado.' })
  @ApiResponse({ status: 403, description: 'Forbidden: Acesso negado.' })
  async deleteItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.removeItemApplication.execute({ id });
  }
}
