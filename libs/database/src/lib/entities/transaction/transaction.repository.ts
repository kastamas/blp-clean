import { Injectable } from '@nestjs/common';
import { BaseRepository, InjectRepository } from '@flexypw/database';
import { TransactionModel } from './transaction.model';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CompanyModel } from '../company/company.model';
import { TransactionsCollectionQueryDto } from '@business-loyalty-program/types';

@Injectable()
export class TransactionRepository extends BaseRepository<TransactionModel> {
  constructor(
    @InjectRepository(TransactionModel) repository: Repository<TransactionModel>
  ) {
    super(repository);
  }

  protected getBaseRelations(): string[] {
    return ['user', 'pos', 'bonusTransaction', 'pos.company'];
  }

  public getCompanyTransactions(
    company: CompanyModel,
    { limit = 20, offset = 0 }: TransactionsCollectionQueryDto
  ) {
    return this.repository
      .createQueryBuilder('transactions')
      .innerJoinAndSelect('transactions.pos', 'pos')
      .innerJoin('pos.company', 'company', 'company.id = :companyId', {
        companyId: company.id,
      })
      .innerJoinAndSelect('transactions.user', 'user')
      .leftJoinAndSelect('transactions.bonusTransaction', 'bonusTransaction')
      .take(limit)
      .skip(offset)
      .orderBy('transactions.createdAt', 'DESC')
      .getManyAndCount();
  }

  public getUsersTransactionsSubQuery(companyId: string) {
    return (db: SelectQueryBuilder<any>) =>
      db
        .select('transaction.userId', 'userId')
        .addSelect('SUM(transaction.amount)', 'total')
        .addSelect('MAX(transaction."createdAt")', 'lastTransaction')
        .from(TransactionModel, 'transaction')
        .innerJoin('transaction.pos', 'pos', 'pos.companyId = :companyId', {
          companyId,
        })
        .groupBy('transaction.userId');
  }
}
