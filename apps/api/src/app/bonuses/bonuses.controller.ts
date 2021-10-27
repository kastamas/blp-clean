import { Body, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BonusesService } from './bonuses.service';
import { PostWithDocs } from '@flexypw/backend-core';
import { JwtSecurity } from '@flexypw/auth';
import { CompaniesAccessGuard } from '../companies/companies-access.guard';
import { Entity } from '@flexypw/database';
import { CompanyModel } from '@business-loyalty-program/database';
import { NewManualBonusTransactionDto } from '@business-loyalty-program/types';

@Controller()
@ApiTags('Bonuses')
export class BonusesController {
  constructor(private readonly bonusesService: BonusesService) {}

  @PostWithDocs('/companies/:id/users/:userId/bonuses')
  @JwtSecurity(CompaniesAccessGuard)
  public applyManualBonuses(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Entity() company: CompanyModel,
    @Body() body: NewManualBonusTransactionDto
  ) {
    return this.bonusesService.applyBonuses(company, userId, body);
  }
}
