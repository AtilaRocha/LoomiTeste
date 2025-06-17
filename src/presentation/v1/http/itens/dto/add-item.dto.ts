import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class AddItemDtoInput {
  @ApiProperty({ type: Number, example: 1 })
  @IsInt()
  @IsNotEmpty()
  @Min(1, { message: 'order_id must be greater than or equal to 1' })
  order_id: number;

  @ApiProperty({ type: Number, example: 1 })
  @IsInt()
  @IsNotEmpty()
  @Min(1, { message: 'product_id must be greater than or equal to 1' })
  product_id: number;

  @ApiProperty({ type: Number, example: 10 })
  @IsInt()
  @Min(1, { message: 'Quantity must be greater than or equal to 1' })
  @IsNotEmpty()
  quantity: number;
}

export class AddItemDtoOutput {
  message: string;
}
