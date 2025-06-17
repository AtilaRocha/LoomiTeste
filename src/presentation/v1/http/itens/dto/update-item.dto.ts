import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UpdateItemDtoInput {
  @ApiProperty({ type: Number, example: 10 })
  @IsInt()
  @Min(1, { message: 'Quantity must be greater than or equal to 1' })
  @IsNotEmpty()
  quantity: number;
}

export class UpdateItemDtoOutput {
  message: string;
}
