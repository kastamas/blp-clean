import { Entity, Column, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '@flexypw/database';
import { CompanyModel } from '../company/company.model';
import { CustomImageModel } from '../custom-image/custom-image.model';
import { EUserSex } from '@business-loyalty-program/enums';

@Entity()
export class UserModel extends BaseEntity {
  @Column('text', { nullable: true })
  public name?: string;

  @ManyToOne(() => CustomImageModel)
  @JoinColumn()
  public image?: CustomImageModel;

  @Column('text', { nullable: true })
  public googleId?: string;

  @Column('text', { nullable: true })
  public vkId?: string;

  @Column('text', { nullable: true })
  public phone?: string;

  @Column('timestamp', { nullable: true })
  public dateOfBirth?: string;

  @Column('text', { nullable: true })
  public email?: string;

  @Column('text', { nullable: true })
  public surname?: string;

  @Column('text', { nullable: true })
  public cardNumber?: string;

  @Column({ type: 'enum', enum: EUserSex, nullable: true })
  public sex?: EUserSex;

  @ManyToMany(() => CompanyModel, (company) => company.users)
  public companies: CompanyModel[];
}
