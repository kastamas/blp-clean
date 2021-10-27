import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class NewPosDto {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  public address: string;

  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  public coords: number[];

  @ApiPropertyOptional()
  @IsOptional()
  public note?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public externalId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public phone?: string;
}
