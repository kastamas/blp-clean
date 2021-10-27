import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CompaniesUpdateDto {
  @ApiPropertyOptional()
  @IsOptional()
  public name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public imageId?: string;
}
