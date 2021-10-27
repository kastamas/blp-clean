import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, Query } from '@nestjs/common';
import { GetWithDocs, PostWithDocs, PutWithDocs } from '@flexypw/backend-core';
import { JwtSecurity } from '@flexypw/auth';
import { CompaniesAccessGuard } from '../companies/companies-access.guard';
import {
  NewPosDto,
  PosCollectionDto,
  PosCollectionQueryDto,
  PosResponseDto,
  PosUpdateDto,
} from '@business-loyalty-program/types';
import { Entity } from '@flexypw/database';
import { CompanyModel, PosModel } from '@business-loyalty-program/database';
import { PosAccessGuard } from './pos-access.guard';
import { PosService } from './pos.service';

@Controller()
@ApiTags('POS')
export class PosController {
  constructor(private posService: PosService) {}

  @GetWithDocs('/companies/:id/pos', PosCollectionDto)
  @JwtSecurity(CompaniesAccessGuard)
  public getCollection(
    @Param('id') id: string,
    @Entity() company: CompanyModel,
    @Query() query: PosCollectionQueryDto
  ) {
    return this.posService.getList(query, company);
  }

  @PostWithDocs('/companies/:id/pos', PosResponseDto)
  @JwtSecurity(CompaniesAccessGuard)
  public create(
    @Param('id') id: string,
    @Body() body: NewPosDto,
    @Entity() company: CompanyModel
  ) {
    return this.posService.create(body, company);
  }

  @GetWithDocs('/pos/:id', PosResponseDto)
  @JwtSecurity(PosAccessGuard)
  public getSingle(@Param('id') id: string, @Entity() entity: PosModel) {
    return entity;
  }

  @PutWithDocs('/pos/:id', PosResponseDto)
  @JwtSecurity(PosAccessGuard)
  public update(
    @Param('id') id: string,
    @Entity() entity: PosModel,
    @Body() body: PosUpdateDto
  ) {
    return this.posService.update(entity, body);
  }
}
