import { ControllerWithDocs, GetWithDocs, PutWithDocs } from '@flexypw/backend-core';
import { JwtSecurity } from '@flexypw/auth';
import { CompaniesAccessGuard } from '../companies/companies-access.guard';
import { Body, Param } from '@nestjs/common';
import { Entity } from '@flexypw/database';
import { CompanyModel } from '@business-loyalty-program/database';
import { SettingsService } from './settings.service';
import { SettingsResponseDto, SettingsUpdateDto } from '@business-loyalty-program/types';

@ControllerWithDocs('/companies/:id/settings', 'Settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @GetWithDocs('/', SettingsResponseDto)
  @JwtSecurity(CompaniesAccessGuard)
  public getCompanySettings(
    @Param('id') id: string,
    @Entity() company: CompanyModel
  ) {
    return company.settings;
  }

  @PutWithDocs('/', SettingsResponseDto)
  @JwtSecurity(CompaniesAccessGuard)
  public updateCompanySettings(
    @Param('id') id: string,
    @Body() body: SettingsUpdateDto,
    @Entity() company: CompanyModel
  ) {
    return this.settingsService.update(company.settings, body);
  }
}
