import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class NewIntegrationTransaction {
  @ApiPropertyOptional({ description: 'Transaction description' })
  @IsOptional()
  public description: string;

  @ApiProperty({ description: 'ID of user to perform transaction to' })
  @IsNotEmpty()
  public userId: string;

  @ApiProperty({ description: 'POS id from which transaction is performing' })
  @IsNotEmpty()
  public posId: string;

  @ApiProperty({ description: 'Amount of money paid during the transaction' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  public amount: number;

  @ApiPropertyOptional({ description: 'External transaction id' })
  @IsOptional()
  public externalId?: string;

  @ApiPropertyOptional({
    description: 'Amount of bonuses to subtract from user account',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  public bonusAmount?: number;
}
