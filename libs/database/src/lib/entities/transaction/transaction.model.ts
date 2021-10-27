import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '@flexypw/database';
import { UserModel } from '../user/user.model';
import { PosModel } from '../pos/pos.model';
import { BonusTransactionModel } from '../bonus-transaction/bonus-transaction.model';

@Entity()
export class TransactionModel extends BaseEntity {
  @ManyToOne(() => UserModel)
  @JoinColumn()
  public user: UserModel;

  @ManyToOne(() => PosModel)
  @JoinColumn()
  public pos: PosModel;

  @Column('integer')
  public amount: number;

  @Column('text', { nullable: true })
  public externalId?: string;

  @Column('text', { nullable: true })
  public description?: string;

  @OneToOne(() => BonusTransactionModel, (item) => item.transaction, {
    nullable: true,
  })
  public bonusTransaction?: BonusTransactionModel;
}
