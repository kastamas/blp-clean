import { ConflictException, Injectable } from '@nestjs/common';
import {
  BonusTransactionRepository,
  CompanyModel,
  UserRepository,
} from '@business-loyalty-program/database';
import { NewManualBonusTransactionDto } from '@business-loyalty-program/types';
import { EBonusTransactionType } from '@business-loyalty-program/enums';

@Injectable()
export class BonusesService {
  constructor(
    private readonly bonusTransactionRepository: BonusTransactionRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async applyBonuses(
    company: CompanyModel,
    userId: string,
    { amount }: NewManualBonusTransactionDto
  ) {
    const {
      bonusAmount: remainingAmount,
    } = await this.userRepository.getCompanyUser(company, userId);

    if (-amount > Number(remainingAmount)) {
      throw new ConflictException();
    }

    const user = await this.userRepository.getCompanyUserBase(company, userId);

    await this.bonusTransactionRepository.create({
      user,
      company,
      type: EBonusTransactionType.Manual,
      amount,
    });
  }
}
