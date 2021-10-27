import { BaseCollection } from '@flexypw/backend-core';
import { ApiProperty } from '@nestjs/swagger';
import { UserBonusTransactionResponseDto } from './user-bonus-transaction-response.dto';

export class UserBonusTransactionCollectionDto extends BaseCollection<UserBonusTransactionResponseDto> {
  @ApiProperty({ type: [UserBonusTransactionResponseDto] })
  public data: UserBonusTransactionResponseDto[];
}
