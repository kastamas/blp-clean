import { Injectable } from '@nestjs/common';
import { IJwtAuthService, ILocalAuthService } from '@flexypw/auth';
import {
  CompanyModel,
  CompanyRepository,
} from '@business-loyalty-program/database';

@Injectable()
export class AuthService
  implements ILocalAuthService<CompanyModel>, IJwtAuthService<CompanyModel> {
  constructor(private readonly companyRepository: CompanyRepository) {}

  public async getUserJwtStrategy(id: string): Promise<CompanyModel> {
    const user = await this.companyRepository.getById(id);
    this.checkUser(user);

    return user;
  }

  public async getUserLocalStrategy(email: string, hashPass: string) {
    const user = await this.companyRepository.getByEmailAndPass(
      email,
      hashPass
    );
    this.checkUser(user);

    return user;
  }

  private checkUser(user?: CompanyModel) {}
}
