import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindByIdProductDtoInput {
  @ApiProperty({ type: String, example: '1' })
  @IsString()
  id: number;
}
