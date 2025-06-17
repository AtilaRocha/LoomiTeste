import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateClientDtoInput {
  @ApiProperty({ type: String, example: 'Atila Rocha' })
  @IsString()
  @MaxLength(400)
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  full_name: string;

  @ApiProperty({ type: String, example: '11954771162' })
  @IsString()
  @Length(11)
  @Matches('[0-9]')
  @IsNotEmpty()
  contact: string;

  @ApiProperty({ type: String, example: 'Distrito Leste 439' })
  @IsString()
  @MaxLength(600)
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  address: string;
}

export class CreateClientDtoOutput {
  message: string;
}
