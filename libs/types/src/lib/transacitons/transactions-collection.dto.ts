import { BaseCollection } from '@flexypw/backend-core';
import { TransactionResponseDto } from './transaction-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionsCollectionDto extends BaseCollection<TransactionResponseDto> {
  @ApiProperty({ type: [TransactionResponseDto] })
  public data: TransactionResponseDto[];
}
