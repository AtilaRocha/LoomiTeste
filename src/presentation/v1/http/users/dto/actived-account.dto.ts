import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ActivedAccountDtoInput {
  @ApiProperty({ type: String, example: '1' })
  @IsString()
  id: string;

  @ApiProperty({ type: String, example: '' })
  @IsString()
  token: string;
}
