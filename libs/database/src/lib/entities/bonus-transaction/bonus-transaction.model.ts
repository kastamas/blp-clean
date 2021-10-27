import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '@flexypw/database';
import { UserModel } from '../user/user.model';
import { CompanyModel } from '../company/company.model';
import { EBonusTransactionType } from '@business-loyalty-program/enums';
import { TransactionModel } from '../transaction/transaction.model';

@Entity()
export class BonusTransactionModel extends BaseEntity {
  @ManyToOne(() => UserModel)
  @JoinColumn()
  public user: UserModel;

  @ManyToOne(() => CompanyModel)
  @JoinColumn()
  public company: CompanyModel;

  @Column({ type: 'enum', enum: EBonusTransactionType })
  public type: EBonusTransactionType;

  @Column('integer')
  public amount: number;

  @OneToOne(() => TransactionModel, (item) => item.bonusTransaction, {
    nullable: true,
  })
  @JoinColumn()
  public transaction?: TransactionModel;
}
