import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@flexypw/database';
import { BonusPolicyDto } from '@business-loyalty-program/types';

@Entity()
export class SettingsModel extends BaseEntity {
  @Column('boolean', { default: false })
  public initialBonusEnabled: boolean;

  @Column('integer', { default: 0 })
  public initialBonus: number;

  @Column('simple-json', { default: [] })
  public bonusPolicy: BonusPolicyDto[];
}
