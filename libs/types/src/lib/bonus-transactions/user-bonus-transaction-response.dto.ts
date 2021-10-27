import { BaseEntityDto } from '@flexypw/database';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EBonusTransactionType } from './enums';
import { Expose, Transform, Type } from 'class-transformer';
import { PosResponseDto } from '../pos/pos-response.dto';

export class UserBonusTransactionResponseDto extends BaseEntityDto {
  constructor(partial: Partial<UserBonusTransactionResponseDto>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ enum: EBonusTransactionType })
  @Expose()
  public type: EBonusTransactionType;

  @ApiProperty()
  @Expose()
  public amount: number;

  @ApiPropertyOptional()
  @Expose()
  @Transform(({ obj }) => obj.transaction?.amount)
  public paidRub?: number;

  @ApiPropertyOptional()
  @Expose()
  @Transform(({ obj }) => obj.transaction?.pos)
  @Type(() => PosResponseDto)
  public pos?: PosResponseDto;
}
