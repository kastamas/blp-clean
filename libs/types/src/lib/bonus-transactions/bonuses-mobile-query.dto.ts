import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { EBonusesType } from './enums';

export class BonusesMobileQueryDto {
  @ApiProperty({ enum: EBonusesType })
  @IsNotEmpty()
  @IsEnum(EBonusesType)
  public type: EBonusesType;
}
