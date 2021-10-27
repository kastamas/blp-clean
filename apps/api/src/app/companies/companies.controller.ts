import {
  ControllerWithDocs,
  GetWithDocs,
  PutWithDocs,
} from '@flexypw/backend-core';
import { JwtSecurity, User } from '@flexypw/auth';
import { CompanyModel } from '@business-loyalty-program/database';
import {
  CompaniesResponseDto,
  CompaniesUpdateDto,
} from '@business-loyalty-program/types';
import { CompaniesAccessGuard } from './companies-access.guard';
import { Body, Param } from '@nestjs/common';
import { Entity } from '@flexypw/database';
import { CompaniesService } from './companies.service';

@ControllerWithDocs('/companies', 'Companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @GetWithDocs('/current', CompaniesResponseDto)
  @JwtSecurity()
  public getCurrentCompany(@User() company: CompanyModel) {
    return company;
  }

  @PutWithDocs('/:id', CompaniesResponseDto)
  @JwtSecurity(CompaniesAccessGuard)
  public updateCompany(
    @Param('id') id: string,
    @Entity() company: CompanyModel,
    @Body() body: CompaniesUpdateDto
  ) {
    return this.companiesService.update(company, body);
  }
}
