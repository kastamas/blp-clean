import { Injectable } from '@nestjs/common';
import {
  CompanyModel,
  CompanyRepository,
  CustomImageRepository,
} from '@business-loyalty-program/database';
import { CompaniesUpdateDto } from '@business-loyalty-program/types';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly customImageRepository: CustomImageRepository
  ) {}

  public async update(
    company: CompanyModel,
    { imageId, ...body }: CompaniesUpdateDto
  ) {
    return this.companyRepository.update(company, {
      ...body,
      ...(await this.customImageRepository.getImageEntityPart(imageId)),
    });
  }
}
