import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class PaymentDtoInput {
  @ApiProperty({
    example: 1,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty({
    example: 19990,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  amount: number;
}
