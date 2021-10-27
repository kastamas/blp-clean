import {
  Body,
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
import { GetWithDocs, PostWithDocs } from '@flexypw/backend-core';
import { JwtSecurity } from '@flexypw/auth';
import { CompaniesAccessGuard } from '../companies/companies-access.guard';
import { Entity } from '@flexypw/database';
import { CompanyModel } from '@business-loyalty-program/database';
import {
  NewUserDto,
  UsersCollectionDto,
  UsersCollectionQueryDto,
  UsersResponseDto,
} from '@business-loyalty-program/types';
import { UsersService } from './users.service';
import { Response } from 'express';
import { ReportBuilder } from '../../common/builders/report-builder';

@Controller()
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PostWithDocs('/companies/:id/users', UsersResponseDto)
  @JwtSecurity(CompaniesAccessGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludeExtraneousValues: true,
  })
  public async createUser(
    @Param('id') id: string,
    @Entity() company: CompanyModel,
    @Body() body: NewUserDto
  ) {
    const user = await this.usersService.create(body, company);
    return new UsersResponseDto(user);
  }

  @GetWithDocs('/companies/:id/users/report')
  @JwtSecurity(CompaniesAccessGuard)
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  )
  public async getReport(
    @Param('id') id: string,
    @Entity() company: CompanyModel,
    @Query() query: UsersCollectionQueryDto,
    @Res() res: Response
  ) {
    const [data] = await this.usersService.getCompanyUsers(company, query);

    await new ReportBuilder(data)
      .setReportName('Клиенты')
      .defineColumns([
        { header: 'Клиент', key: 'name', width: 15 },
        { header: 'ID', key: 'id', width: 40 },
        { header: 'Регистрация', key: 'createdAt', width: 20 },
        { header: 'Остаток баллов', key: 'bonusAmount', width: 20 },
        { header: 'Оплачено, баллы', key: 'paidBonuses', width: 20 },
        { header: 'Оплачено, рубли', key: 'paidRub', width: 20 },
      ])
      .generate()
      .send(res);
  }

  @GetWithDocs('/companies/:id/users', UsersCollectionDto)
  @JwtSecurity(CompaniesAccessGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public getCompanyUsers(
    @Param('id') id: string,
    @Entity() company: CompanyModel,
    @Query() query: UsersCollectionQueryDto
  ) {
    return this.usersService.getCompanyUsers(company, query);
  }

  @GetWithDocs('/companies/:id/users/:userId', UsersResponseDto)
  @JwtSecurity(CompaniesAccessGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public getCompanyUser(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Entity() company: CompanyModel
  ) {
    return this.usersService.getCompanyUser(company, userId);
  }
}
