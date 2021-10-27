import { ExecutionContext, Injectable } from '@nestjs/common';
import { InjectEntityGuard } from '@flexypw/database';
import { PosModel, PosRepository } from '@business-loyalty-program/database';

@Injectable()
export class PosAccessGuard extends InjectEntityGuard<PosModel, PosRepository> {
  constructor(repository: PosRepository) {
    super(repository);
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const targetPos = await super.injectEntity(context);
    const { user } = context.switchToHttp().getRequest();

    return targetPos.company.id === user.id;
  }
}
