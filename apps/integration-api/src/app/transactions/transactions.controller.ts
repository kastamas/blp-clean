import { Body, Controller } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { PostWithDocs } from '@flexypw/backend-core';
import { IntegrationSecurity } from '../../common/guards/integration-auth.guard';
import { User } from '@flexypw/auth';
import { CompanyModel } from '@business-loyalty-program/database';
import { NewIntegrationTransaction } from '@business-loyalty-program/types';

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @PostWithDocs('/transactions')
  @IntegrationSecurity()
  public async createTransaction(
    @User() company: CompanyModel,
    @Body() body: NewIntegrationTransaction
  ) {
    await this.transactionsService.performTransaction(body, company);
  }
}
