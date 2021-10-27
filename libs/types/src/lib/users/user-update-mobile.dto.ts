import { EUserSex } from './enums';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';

export class UserUpdateMobileDto {
  @ApiPropertyOptional()
  @IsOptional()
  public name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public surname?: string;

  @ApiPropertyOptional({ format: 'date' })
  @IsOptional()
  @IsDateString()
  public dateOfBirth?: string;

  @ApiPropertyOptional({ enum: EUserSex })
  @IsOptional()
  @IsEnum(EUserSex)
  public sex?: EUserSex;

  @ApiPropertyOptional()
  @IsOptional()
  public imageId?: string;
}
