import { Column, Entity, ManyToOne } from 'typeorm';
import { CompanyModel } from '../company/company.model';
import { BaseEntity } from '@flexypw/database';

@Entity()
export class PosModel extends BaseEntity {
  @Column('text')
  public name: string;

  @Column('text')
  public address: string;

  @Column({ type: 'float', array: true })
  public coords: number[];

  @Column('text', { nullable: true })
  public note?: string;

  @Column('text', { nullable: true })
  public phone?: string;

  @Column('text', { nullable: true, unique: true })
  public externalId?: string;

  @ManyToOne(() => CompanyModel, (item) => item.pos)
  public company: CompanyModel;
}
