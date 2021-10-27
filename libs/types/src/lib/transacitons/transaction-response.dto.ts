import { BaseEntityDto } from '@flexypw/database';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BonusTransactionShortResponseDto } from '../bonus-transactions/bonus-transaction-short-response.dto';
import { PosResponseDto } from '../pos/pos-response.dto';
import { UsersBaseResponseDto } from '../users/users-base-response.dto';

export class TransactionResponseDto extends BaseEntityDto {
  @ApiProperty()
  public amount: number;

  @ApiProperty()
  public user: UsersBaseResponseDto;

  @ApiProperty()
  public pos: PosResponseDto;

  @ApiProperty()
  public bonusTransaction: BonusTransactionShortResponseDto;

  @ApiPropertyOptional()
  public externalId?: string;

  @ApiPropertyOptional()
  public description?: string;
}
