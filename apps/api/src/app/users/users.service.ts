import { Injectable } from '@nestjs/common';
import {
  BonusTransactionRepository,
  CompanyModel,
  UserRepository,
} from '@business-loyalty-program/database';
import {
  NewUserDto,
  UsersCollectionQueryDto,
} from '@business-loyalty-program/types';
import { EBonusTransactionType } from '@business-loyalty-program/enums';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bonusTransactionRepository: BonusTransactionRepository
  ) {}

  public getCompanyUsers(
    company: CompanyModel,
    query: UsersCollectionQueryDto
  ) {
    return this.userRepository.getCompanyUsers(company, query);
  }

  public getCompanyUser(company: CompanyModel, userId: string) {
    return this.userRepository.getCompanyUser(company, userId);
  }

  public async create(body: NewUserDto, company: CompanyModel) {
    const user = await this.userRepository.create({
      ...body,
      companies: [company],
    });

    if (company.settings.initialBonusEnabled) {
      await this.bonusTransactionRepository.create({
        user,
        company,
        type: EBonusTransactionType.Welcome,
        amount: company.settings.initialBonus,
      });
    }

    return user;
  }
}
