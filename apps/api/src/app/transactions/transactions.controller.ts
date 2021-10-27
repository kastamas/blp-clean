import {
  ClassSerializerInterceptor,
  Controller,
  Header,
  Param,
  Query,
  Res,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { GetWithDocs } from '@flexypw/backend-core';
import { JwtSecurity } from '@flexypw/auth';
import { CompaniesAccessGuard } from '../companies/companies-access.guard';
import { Entity } from '@flexypw/database';
import { CompanyModel } from '@business-loyalty-program/database';
import {
  TransactionsCollectionDto,
  TransactionsCollectionQueryDto,
  UserBonusTransactionCollectionDto,
  UserBonusTransactionCollectionQueryDto,
  UserBonusTransactionResponseDto,
} from '@business-loyalty-program/types';
import { Response } from 'express';
import { ReportBuilder } from '../../common/builders/report-builder';
import { TransactionReportMapper } from './transaction-report.mapper';

@Controller()
@ApiTags('Transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @GetWithDocs('/companies/:id/transactions', TransactionsCollectionDto)
  @JwtSecurity(CompaniesAccessGuard)
  public getCollection(
    @Param('id') id: string,
    @Entity() company: CompanyModel,
    @Query() query: TransactionsCollectionQueryDto
  ) {
    return this.transactionsService.getList(company, query);
  }

  @GetWithDocs('/companies/:id/transactions/report')
  @JwtSecurity(CompaniesAccessGuard)
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
  public async getCollectionReport(
    @Param('id') id: string,
    @Entity() company: CompanyModel,
    @Query() query: TransactionsCollectionQueryDto,
    @Res() res: Response
  ) {
    const [data] = await this.transactionsService.getList(company, query);
    const mappedData = new TransactionReportMapper(data).map();

    await new ReportBuilder(mappedData)
      .setReportName('Операции')
      .defineColumns([
        { header: 'Дата', key: 'createdAt', width: 20 },
        { header: 'Клиент', key: 'client', width: 15 },
        { header: 'Торговая точка', key: 'pos', width: 20 },
        { header: 'Баллы', key: 'bonusAmount', width: 20 },
        { header: 'Рубли', key: 'paidRub', width: 20 },
      ])
      .generate()
      .send(res);
  }

  @GetWithDocs(
    '/companies/:id/users/:userId/transactions',
    UserBonusTransactionCollectionDto
  )
  @JwtSecurity(CompaniesAccessGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludeExtraneousValues: true,
  })
  public async getUserTransactions(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Query() query: UserBonusTransactionCollectionQueryDto,
    @Entity() company: CompanyModel
  ) {
    const [items, count] = await this.transactionsService.getUserTransactions(
      userId,
      company,
      query
    );

    const enhancedItems = items.map(
      (item) => new UserBonusTransactionResponseDto(item)
    );

    return [enhancedItems, count];
  }
}
