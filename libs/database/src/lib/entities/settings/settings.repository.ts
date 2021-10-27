import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SettingsModel } from './settings.model';
import { BaseRepository, InjectRepository } from '@flexypw/database';
import { CompanyModel } from '../company/company.model';

@Injectable()
export class SettingsRepository extends BaseRepository<SettingsModel> {
  constructor(
    @InjectRepository(SettingsModel) repository: Repository<SettingsModel>
  ) {
    super(repository);
  }

  protected getBaseRelations(): string[] {
    return [];
  }

  public getCompanySettings(company: CompanyModel) {
    return this.repository.findOneOrFail({
      where: { company },
    });
  }
}
