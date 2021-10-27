import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@flexypw/database';
import { CompanyModel } from '../company/company.model';

@Entity()
export class IntegrationTokenModel extends BaseEntity {
  @Column('text')
  public name: string;

  @Column('text', { unique: true })
  public token: string;

  @ManyToOne(() => CompanyModel, (item) => item.tokens)
  public company: CompanyModel;
}
