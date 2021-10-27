import {
  ControllerWithDocs,
  DeleteWithDocs,
  GetWithDocs,
  PostWithDocs,
} from '@flexypw/backend-core';
import { JwtSecurity, User } from '@flexypw/auth';
import {
  IntegrationCollectionDto,
  IntegrationCollectionQueryDto,
  IntegrationResponseDto,
  NewIntegrationDto,
} from '@business-loyalty-program/types';
import { Body, Param, Query } from '@nestjs/common';
import { CompanyModel } from '@business-loyalty-program/database';
import { IntegrationService } from './integration.service';

@ControllerWithDocs('/integration', 'Integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @PostWithDocs('/', IntegrationResponseDto)
  @JwtSecurity()
  public create(
    @Body() body: NewIntegrationDto,
    @User() company: CompanyModel
  ) {
    return this.integrationService.create(body, company);
  }

  @GetWithDocs('/', IntegrationCollectionDto)
  @JwtSecurity()
  public getCollection(
    @User() company: CompanyModel,
    @Query() query: IntegrationCollectionQueryDto
  ) {
    return this.integrationService.getList(company, query);
  }

  @DeleteWithDocs('/:id')
  @JwtSecurity()
  public delete(@Param('id') id: string, @User() company: CompanyModel) {
    return this.integrationService.delete(id, company);
  }
}
