import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FileResponseDto } from '@flexypw/files-core';
import { Expose, Transform } from 'class-transformer';
import { UsersBaseResponseDto } from './users-base-response.dto';

export class UsersResponseDto extends UsersBaseResponseDto {
  constructor(partial: Partial<UsersResponseDto>) {
    super(partial);
  }

  @ApiPropertyOptional()
  @Expose()
  public image?: FileResponseDto;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) => Number(value))
  public paidRub: number;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) => Math.abs(Number(value)))
  public paidBonuses: number;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) => Number(value))
  public bonusAmount: number;

  @ApiPropertyOptional({ format: 'date-time' })
  @Expose()
  public lastTransactionDate?: string;
}
