import { BaseEntityDto } from '@flexypw/database';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FileResponseDto } from '@flexypw/files-core';

export class CompaniesResponseDto extends BaseEntityDto {
  @ApiProperty({ format: 'email' })
  public email: string;

  @ApiProperty()
  public name: string;

  @ApiPropertyOptional()
  public phone?: string;

  @ApiPropertyOptional()
  public description?: string;

  @ApiPropertyOptional()
  public image?: FileResponseDto;
}
