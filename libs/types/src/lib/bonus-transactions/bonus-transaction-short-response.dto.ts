import { BaseEntityDto } from '@flexypw/database';
import { ApiProperty } from '@nestjs/swagger';
import { EBonusTransactionType } from './enums';

export class BonusTransactionShortResponseDto extends BaseEntityDto {
  @ApiProperty()
  public amount: number;

  @ApiProperty({ enum: EBonusTransactionType })
  public type: EBonusTransactionType;
}
