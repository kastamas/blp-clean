import { BaseEntityDto } from '@flexypw/database';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CompaniesResponseDto } from '../companies/companies-response.dto';
import { EUserSex } from './enums';
import { FileResponseDto } from '@flexypw/files-core';

export class UsersMobileResponseDto extends BaseEntityDto {
  @ApiPropertyOptional()
  public name?: string;

  @ApiPropertyOptional()
  public cardNumber?: string;

  @ApiPropertyOptional()
  public dateOfBirth?: string;

  @ApiPropertyOptional()
  public email?: string;

  @ApiPropertyOptional()
  public googleId?: string;

  @ApiPropertyOptional()
  public phone?: string;

  @ApiPropertyOptional()
  public surname?: string;

  @ApiPropertyOptional()
  public vkId?: string;

  @ApiPropertyOptional({ enum: EUserSex })
  public sex?: EUserSex;

  @ApiProperty({ type: [CompaniesResponseDto] })
  public companies: CompaniesResponseDto[];

  @ApiPropertyOptional()
  public image?: FileResponseDto;
}
