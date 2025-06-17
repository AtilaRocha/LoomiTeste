import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatus } from 'src/shared/order-status.enum';

export class UpdateOrderStatusDtoInput {
  @ApiProperty({ type: Number, example: 10 })
  @IsEnum(OrderStatus)
  @IsNotEmpty()
  status: OrderStatus;
}

export class UpdateOrderStatusDtoOutput {
  message: string;
}
