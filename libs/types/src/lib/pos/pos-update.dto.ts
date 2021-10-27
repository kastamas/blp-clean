import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class PosUpdateDto {
  @ApiPropertyOptional()
  @IsOptional()
  public name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public address?: string;

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  public coords?: number[];

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
