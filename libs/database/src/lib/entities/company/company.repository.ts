import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CompanyModel } from './company.model';
import { BaseRepository, InjectRepository } from '@flexypw/database';

@Injectable()
export class CompanyRepository extends BaseRepository<CompanyModel> {
  constructor(
    @InjectRepository(CompanyModel) repository: Repository<CompanyModel>
  ) {
    super(repository);
  }

  protected getBaseRelations(): string[] {
    return ['image', 'settings'];
  }

  public getFirstCompany() {
    return this.repository.findOne({
      relations: this.getBaseRelations(),
    });
  }

  public getByEmail(email: string) {
    return this.repository.findOne({
      where: { email },
    });
  }

  public async getByEmailAndPass(email: string, password: string) {
    return this.repository.findOne({
      where: {
        email,
        password,
      },
    });
  }
}
