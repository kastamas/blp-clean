import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { BonusPolicyDto } from './bonus-policy.dto';
import { Type } from 'class-transformer';

export class SettingsUpdateDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  public initialBonusEnabled?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  public initialBonus?: number;

  @ApiPropertyOptional({ type: [BonusPolicyDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BonusPolicyDto)
  @IsArray()
  public bonusPolicy: BonusPolicyDto[];
}
