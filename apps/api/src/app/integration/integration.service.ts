import { Injectable } from '@nestjs/common';
import {
  CompanyModel,
  IntegrationTokenRepository,
} from '@business-loyalty-program/database';
import {
  IntegrationCollectionQueryDto,
  NewIntegrationDto,
} from '@business-loyalty-program/types';
import { generateHashWithTimestamp } from '@flexypw/backend-core';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly integrationTokenRepository: IntegrationTokenRepository
  ) {}

  public create(body: NewIntegrationDto, company: CompanyModel) {
    const token = generateHashWithTimestamp(body.name);

    return this.integrationTokenRepository.create({
      ...body,
      token,
      company,
    });
  }

  public getList(company: CompanyModel, query: IntegrationCollectionQueryDto) {
    return this.integrationTokenRepository.getList(query, {
      company,
    });
  }

  public async delete(id: string, company: CompanyModel) {
    await this.integrationTokenRepository.getByIdAndCompany(id, company);
    await this.integrationTokenRepository.deleteById(id);
  }
}
