import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class FindByIdItemDtoInput {
  @ApiProperty({ type: Number, example: 1 })
  @IsNumberString()
  @IsNotEmpty()
  id: number;
}
