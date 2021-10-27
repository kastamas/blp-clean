import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EBonusTransactionType } from './enums';

export class BonusTransactionResponseMobileDto {
  @ApiProperty()
  public id: string;

  @ApiPropertyOptional()
  public posName?: string;

  @ApiProperty()
  public amount: number;

  @ApiProperty()
  public createdAt: string;

  @ApiProperty({ enum: EBonusTransactionType })
  public type: EBonusTransactionType;
}
