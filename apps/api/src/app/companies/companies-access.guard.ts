import { ExecutionContext, Injectable } from '@nestjs/common';
import { InjectEntityGuard } from '@flexypw/database';
import {
  CompanyModel,
  CompanyRepository,
} from '@business-loyalty-program/database';

@Injectable()
export class CompaniesAccessGuard extends InjectEntityGuard<
  CompanyModel,
  CompanyRepository
> {
  constructor(repository: CompanyRepository) {
    super(repository);
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const targetCompany = await super.injectEntity(context);
    const { user } = context.switchToHttp().getRequest()

    return targetCompany.id === user.id;
  }
}
