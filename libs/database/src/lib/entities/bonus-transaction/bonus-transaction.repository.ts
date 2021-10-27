import { Injectable } from '@nestjs/common';
import { BaseRepository, InjectRepository } from '@flexypw/database';
import { BonusTransactionModel } from './bonus-transaction.model';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { TransactionModel } from '../transaction/transaction.model';
import { PosModel } from '../pos/pos.model';
import { EBonusesType } from '@business-loyalty-program/enums';
import { CompanyModel } from '../company/company.model';
import { UserModel } from '../user/user.model';
import { UserBonusTransactionCollectionQueryDto } from '@business-loyalty-program/types';

@Injectable()
export class BonusTransactionRepository extends BaseRepository<BonusTransactionModel> {
  constructor(
    @InjectRepository(BonusTransactionModel)
    repository: Repository<BonusTransactionModel>
  ) {
    super(repository);
  }

  protected getBaseRelations(): string[] {
    return [];
  }

  public getCompanyUserTransactionsFull(
    company: CompanyModel,
    user: UserModel,
    { limit = 20, offset = 0 }: UserBonusTransactionCollectionQueryDto
  ) {
    return this.repository.findAndCount({
      relations: ['company', 'user', 'transaction', 'transaction.pos'],
      where: {
        company,
        user,
      },
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  public async getCompanyUserTransactions(
    companyId: string,
    userId: string,
    type: EBonusesType
  ) {
    const builder = this.repository
      .createQueryBuilder('bonusTransaction')
      .select('"bonusTransaction".amount', 'amount')
      .addSelect('"bonusTransaction".id', 'id')
      .addSelect('"bonusTransaction"."createdAt"', 'createdAt')
      .addSelect('"bonusTransaction".type', 'type')
      .addSelect('pos.name', 'posName')
      .leftJoin(
        TransactionModel,
        'transaction',
        '"bonusTransaction"."transactionId" = transaction.id'
      )
      .leftJoin(PosModel, 'pos', 'transaction."posId" = pos.id')
      .where('"bonusTransaction"."companyId" = :companyId', { companyId })
      .andWhere('"bonusTransaction"."userId" = :userId', { userId })
      .orderBy('"bonusTransaction"."createdAt"', 'DESC');

    if (type === EBonusesType.Add) {
      builder.andWhere('"bonusTransaction".amount > 0');
    }

    if (type === EBonusesType.Subtract) {
      builder.andWhere('"bonusTransaction".amount < 0');
    }

    return builder.getRawMany();
  }

  public async getCompanyUserBalance(companyId: string, userId: string) {
    const [{ total }] = await this.repository
      .createQueryBuilder('transaction')
      .select('COALESCE(SUM(transaction.amount), 0)', 'total')
      .where('transaction."companyId" = :companyId', { companyId })
      .andWhere('transaction."userId" = :userId', { userId })
      .getRawMany();

    return Number(total);
  }

  public getUsersTransactionsSubQuery(companyId: string) {
    return (db: SelectQueryBuilder<any>) =>
      db
        .select('transaction.userId', 'userId')
        .addSelect('SUM(transaction.amount)', 'total')
        .addSelect(
          'SUM(transaction.amount) FILTER (WHERE transaction.amount < 0)',
          'spent'
        )
        .from(BonusTransactionModel, 'transaction')
        .where('transaction."companyId" = :companyId', { companyId })
        .groupBy('transaction."userId"');
  }
}
