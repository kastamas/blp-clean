import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class NewManualBonusTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  public amount: number;
}
