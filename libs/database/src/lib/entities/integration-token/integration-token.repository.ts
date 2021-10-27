import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IntegrationTokenModel } from './integration-token.model';
import { BaseRepository, InjectRepository } from '@flexypw/database';
import { CompanyModel } from '../company/company.model';

@Injectable()
export class IntegrationTokenRepository extends BaseRepository<IntegrationTokenModel> {
  constructor(
    @InjectRepository(IntegrationTokenModel)
    repository: Repository<IntegrationTokenModel>
  ) {
    super(repository);
  }

  protected getBaseRelations(): string[] {
    return [];
  }

  public getByIdAndCompany(id: string, company: CompanyModel) {
    return this.repository.findOneOrFail({
      where: {
        id,
        company,
      },
    });
  }

  public getByValue(token: string) {
    return this.repository.findOne({
      where: { token },
      relations: ['company', 'company.settings'],
    });
  }
}
