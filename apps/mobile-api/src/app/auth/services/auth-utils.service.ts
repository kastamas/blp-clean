import { ConflictException, Injectable } from '@nestjs/common';
import {
  BonusTransactionRepository,
  CompanyRepository,
  UserModel,
  UserRepository,
} from '@business-loyalty-program/database';
import { TSupportedAuthTypes } from '@business-loyalty-program/types';
import { EBonusTransactionType } from '@business-loyalty-program/enums';
import { BaseAuthService } from '@flexypw/auth';

@Injectable()
export class AuthUtilsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly baseAuthService: BaseAuthService,
    private readonly companyRepository: CompanyRepository,
    private readonly bonusTransactionRepository: BonusTransactionRepository
  ) {}

  private async createUserByAuthType(
    body: Partial<UserModel>,
    typePayload: string,
    type: TSupportedAuthTypes
  ) {
    const existingUser = await this.userRepository.getByAuthType(
      typePayload,
      type
    );

    if (existingUser) {
      return existingUser;
    }

    const company = await this.companyRepository.getFirstCompany();
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

  private getLinkFieldName(type: TSupportedAuthTypes) {
    switch (type) {
      case 'google':
        return 'googleId';
      case 'vk':
        return 'vkId';
      case 'phone':
        return 'phone';
      default:
        throw new Error('Unsupported auth type');
    }
  }

  public async linkUserToAuth(
    user: UserModel,
    typePayload: string,
    type: TSupportedAuthTypes,
    additionalFields: Partial<UserModel> = {}
  ) {
    const existingUser = await this.userRepository.getByAuthType(
      typePayload,
      type
    );

    if (existingUser) {
      throw new ConflictException();
    }

    const updateBody: Partial<UserModel> = {
      [this.getLinkFieldName(type)]: typePayload,
    };

    if (additionalFields.name && !user.name) {
      updateBody.name = additionalFields.name;
    }

    if (additionalFields.surname && !user.surname) {
      updateBody.surname = additionalFields.surname;
    }

    if (additionalFields.email && !user.email) {
      updateBody.email = additionalFields.email;
    }

    if (additionalFields.phone && !user.phone) {
      updateBody.phone = additionalFields.phone;
    }

    await this.userRepository.update(user, updateBody);

    return this.baseAuthService.generateTokens(user);
  }

  public async authByType(
    body: Partial<UserModel>,
    typePayload: string,
    type: TSupportedAuthTypes
  ) {
    const user = await this.createUserByAuthType(body, typePayload, type);

    return this.baseAuthService.generateTokens(user);
  }
}
