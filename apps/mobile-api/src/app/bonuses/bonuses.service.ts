import { Injectable } from '@nestjs/common';
import { BonusTransactionRepository } from '@business-loyalty-program/database';
import { EBonusesType } from '@business-loyalty-program/enums';

@Injectable()
export class BonusesService {
  constructor(
    private readonly bonusTransactionRepository: BonusTransactionRepository
  ) {}

  public getBalance(companyId: string, userId: string) {
    return this.bonusTransactionRepository.getCompanyUserBalance(
      companyId,
      userId
    );
  }

  public getBonusesHistory(
    companyId: string,
    userId: string,
    type: EBonusesType
  ) {
    return this.bonusTransactionRepository.getCompanyUserTransactions(
      companyId,
      userId,
      type
    );
  }
}
