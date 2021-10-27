import { Injectable } from '@nestjs/common';
import {
  BonusTransactionRepository,
  CompanyModel,
  TransactionRepository,
  UserRepository,
} from '@business-loyalty-program/database';
import {
  TransactionsCollectionQueryDto,
  UserBonusTransactionCollectionQueryDto,
} from '@business-loyalty-program/types';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly bonusTransactionRepository: BonusTransactionRepository,
    private readonly userRepository: UserRepository
  ) {}

  public getList(company: CompanyModel, query: TransactionsCollectionQueryDto) {
    return this.transactionRepository.getCompanyTransactions(company, query);
  }

  public async getUserTransactions(
    userId: string,
    company: CompanyModel,
    query: UserBonusTransactionCollectionQueryDto
  ) {
    const user = await this.userRepository.getByIdOrFail(userId);

    return this.bonusTransactionRepository.getCompanyUserTransactionsFull(
      company,
      user,
      query
    );
  }
}
