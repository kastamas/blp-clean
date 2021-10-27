import { ExecutionContext, Injectable } from '@nestjs/common';
import { InjectEntityGuard } from '@flexypw/database';
import {
  CompanyModel,
  CompanyRepository,
  UserRepository,
} from '@business-loyalty-program/database';

@Injectable()
export class UserCompanyAccessGuard extends InjectEntityGuard<
  CompanyModel,
  CompanyRepository
> {
  constructor(
    repository: CompanyRepository,
    private readonly userRepository: UserRepository
  ) {
    super(repository);
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const company = await super.injectEntity(context);
    const { user } = context.switchToHttp().getRequest();

    await this.userRepository.getCompanyUserBase(company, user.id);

    return true;
  }
}
