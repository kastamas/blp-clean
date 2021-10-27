import { BaseEntityDto } from '@flexypw/database';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BonusPolicyDto } from './bonus-policy.dto';

export class SettingsResponseDto extends BaseEntityDto {
  @ApiProperty()
  public initialBonusEnabled: boolean;

  @ApiProperty()
  public initialBonus: number;

  @ApiPropertyOptional({ type: [BonusPolicyDto] })
  public bonusPolicy: BonusPolicyDto[];
}
