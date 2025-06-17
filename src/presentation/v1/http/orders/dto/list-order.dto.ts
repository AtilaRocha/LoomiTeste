import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// @ts-ignore
import { OrderStatus } from '@prisma/client';
import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ListOrderDtoInput {
  @ApiPropertyOptional({
    description: 'Filtrar por status do pedido',
    enum: OrderStatus,
    example: 'received',
  })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @ApiPropertyOptional({
    description: 'Filtrar pelo ID do cliente',
    type: Number,
    example: 1,
    name: 'client_id',
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  client_id?: number;

  @ApiPropertyOptional({
    description: 'Filtrar por valor total do pedido',
    type: Number,
    example: 900.5,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  total?: number;
}

class ProductInOrderDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
}

class OrderItemDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  price_per_unit: number;
  @ApiProperty({ type: ProductInOrderDto })
  product: ProductInOrderDto;
}
class OrderClientDto {
  @ApiProperty()
  full_name: string;
}

class OrderDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  client_id: number;
  @ApiProperty({ enum: OrderStatus })
  status: OrderStatus;
  @ApiProperty()
  total: number;
  @ApiProperty()
  order_date: Date;
  @ApiProperty()
  updated_at: Date;
  @ApiProperty({ type: OrderClientDto })
  client: OrderClientDto;
  @ApiProperty({ type: [OrderItemDto] })
  items: OrderItemDto[];
}

export class ListOrderDtoOutput {
  @ApiProperty({ type: [OrderDto] })
  orders: OrderDto[];
}
