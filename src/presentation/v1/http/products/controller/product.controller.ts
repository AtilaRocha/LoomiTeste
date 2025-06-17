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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateProductApplication } from 'src/application/products/create-product.application';
import { ListProductApplication } from 'src/application/products/list-product.application';
import { FindByIdProductApplication } from 'src/application/products/find-by-id-product.application';
import { UpdateProductApplication } from 'src/application/products/update-product.application';
import { DeleteProductApplication } from 'src/application/products/delete-product.application';

import {
  CreateProductDtoInput,
  CreateProductDtoOutput,
} from '../dto/create-product.dto';
import {
  UpdateProductDtoInput,
  UpdateProductDtoOutput,
} from '../dto/update-product.dto';
import {
  ListProductDtoOutput,
  ListProductDtoInput,
} from '../dto/list-product.dto';

import { Roles } from 'src/presentation/roles.decorator';
import { Role } from 'src/presentation/enum/role.enum';
import { RolesGuard } from 'src/presentation/guard/roles.guard';

type anyService = any;

@ApiTags('Products')
@ApiBearerAuth('token')
@UseGuards(RolesGuard)
@Controller('products')
export class ProductController {
  constructor(
    @Inject(CreateProductApplication)
    private readonly createProductApplication: anyService,
    @Inject(ListProductApplication)
    private readonly listProductApplication: anyService,
    @Inject(FindByIdProductApplication)
    private readonly findByIdProductApplication: anyService,
    @Inject(UpdateProductApplication)
    private readonly updateProductApplication: anyService,
    @Inject(DeleteProductApplication)
    private readonly deleteProductApplication: anyService,
  ) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({
    status: 201,
    description: 'O produto foi criado com sucesso.',
    type: CreateProductDtoOutput,
  })
  @ApiResponse({ status: 400, description: 'Bad Request: Dados inválidos.' })
  @ApiResponse({ status: 403, description: 'Forbidden: Acesso negado.' })
  async create(
    @Body() input: CreateProductDtoInput,
  ): Promise<CreateProductDtoOutput> {
    return this.createProductApplication.execute(input);
  }

  @Get()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Listar produtos com filtros opcionais' })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
    description: 'Filtrar produtos por nome',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso.',
    type: ListProductDtoOutput,
  })
  @ApiResponse({ status: 403, description: 'Forbidden: Acesso negado.' })
  async list(
    @Query() query: ListProductDtoInput,
  ): Promise<ListProductDtoOutput> {
    return this.listProductApplication.execute(query);
  }

  @Get(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Encontrar um produto pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do produto', type: Number })
  @ApiResponse({ status: 200, description: 'Dados do produto retornados.' })
  @ApiResponse({
    status: 404,
    description: 'Not Found: Produto não encontrado.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden: Acesso negado.' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.findByIdProductApplication.execute({ id });
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Atualizar um produto' })
  @ApiParam({ name: 'id', description: 'ID do produto', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado com sucesso.',
    type: UpdateProductDtoOutput,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: Produto não encontrado.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden: Acesso negado.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateProductDtoInput,
  ): Promise<UpdateProductDtoOutput> {
    return this.updateProductApplication.execute({ id }, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Deletar um produto' })
  @ApiParam({ name: 'id', description: 'ID do produto', type: Number })
  @ApiResponse({ status: 204, description: 'Produto deletado com sucesso.' })
  @ApiResponse({
    status: 404,
    description: 'Not Found: Produto não encontrado.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden: Acesso negado.' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteProductApplication.execute({ id });
  }
}
