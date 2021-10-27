import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from '@flexypw/database';
import { SettingsModel } from '../settings/settings.model';
import { CustomImageModel } from '../custom-image/custom-image.model';
import { PosModel } from '../pos/pos.model';
import { UserModel } from '../user/user.model';
import { IntegrationTokenModel } from '../integration-token/integration-token.model';

@Entity()
export class CompanyModel extends BaseEntity {
  @Column('text', {
    select: false,
  })
  public password: string;

  @Column('text', { unique: true })
  public email: string;

  @Column('text')
  public name: string;

  @Column('text', { nullable: true })
  public phone: string;

  @Column('text', { nullable: true })
  public description: string;

  @ManyToOne(() => CustomImageModel)
  @JoinColumn()
  public image?: CustomImageModel;

  @OneToOne(() => SettingsModel)
  @JoinColumn()
  public settings: SettingsModel;

  @OneToMany(() => PosModel, (item) => item.company)
  public pos: PosModel[];

  @OneToMany(() => IntegrationTokenModel, (item) => item.company)
  public tokens: IntegrationTokenModel[];

  @ManyToMany(() => UserModel, (user) => user.companies)
  @JoinTable()
  public users: UserModel[];
}
