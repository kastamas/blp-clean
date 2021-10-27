import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder, Raw } from 'typeorm';
import { UserModel } from './user.model';
import { BaseRepository, InjectRepository } from '@flexypw/database';
import { CompanyModel } from '../company/company.model';
import {
  TSupportedAuthTypes,
  UsersCollectionQueryDto,
  UsersResponseDto,
} from '@business-loyalty-program/types';
import { TransactionRepository } from '../transaction/transaction.repository';
import { BonusTransactionRepository } from '../bonus-transaction/bonus-transaction.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserModel> {
  constructor(
    @InjectRepository(UserModel) repository: Repository<UserModel>,
    private readonly transactionRepository: TransactionRepository,
    private readonly bonusTransactionRepository: BonusTransactionRepository
  ) {
    super(repository);
  }

  protected getBaseRelations(): string[] {
    return ['companies', 'image'];
  }

  private getCompanyUsersBaseQuery(companyId: string) {
    return this.repository
      .createQueryBuilder('users')
      .innerJoin('users.companies', 'company', 'company.id = :companyId', {
        companyId,
      });
  }

  private injectCompanyUsersBaseFields(builder: SelectQueryBuilder<UserModel>) {
    return builder
      .clone()
      .select('users.name', 'name')
      .addSelect('users.id', 'id')
      .addSelect('users.createdAt', 'createdAt')
      .addSelect('users.surname', 'surname')
      .addSelect('users.dateOfBirth', 'dateOfBirth')
      .addSelect('users.email', 'email')
      .addSelect('users.phone', 'phone')
      .addSelect('users.cardNumber', 'cardNumber')
      .addSelect('users.sex', 'sex')
      .addSelect('COALESCE(transaction.total, 0)', 'paidRub')
      .addSelect('transaction."lastTransaction"', 'lastTransactionDate')
      .addSelect('COALESCE("bonusTransaction".total, 0)', 'bonusAmount')
      .addSelect('COALESCE("bonusTransaction".spent, 0)', 'paidBonuses')
      .addSelect('row_to_json(image.*)', 'image')
      .leftJoin('users.image', 'image');
  }

  public getByAuthType(payload: string, type: TSupportedAuthTypes) {
    switch (type) {
      case 'google':
        return this.repository.findOne({
          where: { googleId: payload },
        });
      case 'vk':
        return this.repository.findOne({
          where: { vkId: payload },
        });
      case 'phone':
        return this.repository.findOne({
          where: { phone: payload },
        });
      default:
        throw new Error('Unsupported auth type');
    }
  }

  public getByQuery(query: string) {
    return this.repository.findOne({
      where: [
        { id: Raw(() => `"UserModel".id::text = '${query}'`) },
        { phone: query },
        { cardNumber: query },
      ],
    });
  }

  public getCompanyUserBase(company: CompanyModel, userId: string) {
    return this.getCompanyUsersBaseQuery(company.id)
      .where('users.id = :userId', { userId })
      .getOneOrFail();
  }

  public async getCompanyUser(company: CompanyModel, userId: string) {
    const baseQuery = this.getCompanyUsersBaseQuery(company.id).where(
      'users.id = :userId',
      { userId }
    );

    const user = await this.injectCompanyUsersBaseFields(baseQuery)
      .leftJoin(
        this.transactionRepository.getUsersTransactionsSubQuery(company.id),
        'transaction',
        'transaction."userId" = users.id'
      )
      .leftJoin(
        this.bonusTransactionRepository.getUsersTransactionsSubQuery(
          company.id
        ),
        'bonusTransaction',
        '"bonusTransaction"."userId" = users.id'
      )
      .getRawOne();

    if (!user) {
      throw new NotFoundException({
        message: 'User not found',
      });
    }

    return new UsersResponseDto(user);
  }

  public async getCompanyUsers(
    company: CompanyModel,
    { limit = 20, offset = 0 }: UsersCollectionQueryDto
  ) {
    console.log(limit, offset);
    const baseQuery = this.getCompanyUsersBaseQuery(company.id);

    const count = await baseQuery.clone().getCount();

    const data = await this.injectCompanyUsersBaseFields(baseQuery)
      .leftJoin(
        this.transactionRepository.getUsersTransactionsSubQuery(company.id),
        'transaction',
        'transaction."userId" = users.id'
      )
      .leftJoin(
        this.bonusTransactionRepository.getUsersTransactionsSubQuery(
          company.id
        ),
        'bonusTransaction',
        '"bonusTransaction"."userId" = users.id'
      )
      .orderBy('users."createdAt"', 'DESC')
      .limit(limit)
      .offset(offset)
      .getRawMany();

    const mappedData = data.map((item) => new UsersResponseDto(item));

    return [mappedData, count] as [UsersResponseDto[], number];
  }
}
