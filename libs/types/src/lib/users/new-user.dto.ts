import { EUserSex } from './enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class NewUserDto {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiPropertyOptional()
  @IsOptional()
  public surname?: string;

  @ApiPropertyOptional()
  @IsOptional()
  public phone?: string;

  @ApiPropertyOptional({ format: 'date' })
  @IsDateString()
  @IsOptional()
  public dateOfBirth?: string;

  @ApiPropertyOptional({ enum: EUserSex })
  @IsOptional()
  @IsEnum(EUserSex)
  public sex?: EUserSex;

  @ApiPropertyOptional()
  @IsOptional()
  public cardNumber?: string;
}
