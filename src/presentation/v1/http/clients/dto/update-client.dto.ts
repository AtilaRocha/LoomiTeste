import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateClientDtoInput {
  @ApiProperty({ type: String, required: false, example: 'Nome Completo' })
  @IsString()
  @MaxLength(400)
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  full_name?: string;

  @ApiProperty({ type: String, required: false, example: '11954771162' })
  @IsString()
  @Length(11)
  @Matches('[0-9]')
  @IsOptional()
  contact?: string;

  @ApiProperty({ type: String, required: false, example: 'Distrito Leste 439' })
  @IsString()
  @MaxLength(600)
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  address?: string;

  @ApiProperty({ type: Boolean, required: false, example: true })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}

export class UpdateClientDtoOutput {
  message: string;
}
