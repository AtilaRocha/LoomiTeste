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
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { CreateOrderApplication } from 'src/application/orders/create-order.application';
import { UpdateOrderStatusApplication } from 'src/application/orders/update-order-status.application';
import { ListOrderApplication } from 'src/application/orders/list-order.application';
import { DeleteOrderApplication } from 'src/application/orders/delete-order.application';

import {
  CreateOrderDtoInput,
  CreateOrderDtoOutput,
} from '../dto/create-order.dto';
import { UpdateOrderStatusDtoInput } from '../dto/update-status.dto';
import { ListOrderDtoInput, ListOrderDtoOutput } from '../dto/list-order.dto';
import { ClientUserHttpDtoInput } from '../../clients/dto/user-http-context.dto';

import { Roles } from 'src/presentation/roles.decorator';
import { Role } from 'src/presentation/enum/role.enum';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(
    @Inject(CreateOrderApplication)
    private createOrderApplication: CreateOrderApplication,
    @Inject(UpdateOrderStatusApplication)
    private updateOrderStatusApplication: UpdateOrderStatusApplication,
    @Inject(ListOrderApplication)
    private listOrderApplication: ListOrderApplication,
    @Inject(DeleteOrderApplication)
    private deleteOrderApplication: DeleteOrderApplication,
  ) {}

  @Post()
  @Roles(Role.Client)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Criar um novo pedido' })
  @ApiResponse({
    status: 201,
    description: 'O pedido foi criado com sucesso.',
    type: CreateOrderDtoOutput,
  })
  @ApiResponse({ status: 403, description: 'Forbidden: Acesso negado.' })
  @ApiResponse({ status: 400, description: 'Bad Request: Dados inválidos.' })
  async createOrder(
    @Req() request: Request & { user: ClientUserHttpDtoInput },
    @Body() input: CreateOrderDtoInput,
  ): Promise<CreateOrderDtoOutput> {
    if (!request.user.client?.id) {
      throw new ForbiddenException(
        'Este usuário não possui um perfil de cliente para criar pedidos.',
      );
    }
    return await this.createOrderApplication.execute(
      input,
      request.user.client.id,
    );
  }

  @Get()
  @Roles(Role.Admin)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Listar todos os pedidos' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['received', 'preparation', 'dispatched', 'delivered', 'refused'],
  })
  @ApiQuery({ name: 'client_id', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos retornada com sucesso.',
    type: ListOrderDtoOutput,
  })
  @ApiResponse({ status: 403, description: 'Forbidden: Acesso negado.' })
  async list(@Query() input: ListOrderDtoInput): Promise<ListOrderDtoOutput> {
    return await this.listOrderApplication.execute(input);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Atualizar o status de um pedido' })
  @ApiParam({
    name: 'id',
    description: 'ID do pedido a ser atualizado',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'O pedido foi atualizado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado.' })
  @ApiResponse({ status: 403, description: 'Forbidden: Acesso negado.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateOrderStatusDtoInput,
  ): Promise<Record<string, any>> {
    return await this.updateOrderStatusApplication.execute({ id }, input);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.Admin)
  @ApiBearerAuth('token')
  @ApiOperation({ summary: 'Deletar um pedido' })
  @ApiParam({
    name: 'id',
    description: 'ID do pedido a ser deletado',
    type: Number,
  })
  @ApiResponse({
    status: 204,
    description: 'O pedido foi deletado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Pedido não encontrado.' })
  @ApiResponse({ status: 403, description: 'Forbidden: Acesso negado.' })
  async deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteOrderApplication.execute({ id });
  }
}
