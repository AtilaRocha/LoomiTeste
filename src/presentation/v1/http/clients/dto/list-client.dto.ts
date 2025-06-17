import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class ListClientDtoInput {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @MaxLength(400)
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  full_name?: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @Length(11)
  @Matches('[0-9]')
  @IsOptional()
  contact?: string;

  @ApiProperty({ type: String, required: false })
  @IsString()
  @MaxLength(600)
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  address?: string;
}

export class Client {
  id: number;
  full_name: string;
  contact: string;
  address: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

export class ListClientDtoOutput {
  clients: Client[];
}
