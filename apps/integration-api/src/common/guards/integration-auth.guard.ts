import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { IntegrationTokenRepository } from '@business-loyalty-program/database';

@Injectable()
class IntegrationAuthGuard implements CanActivate {
  constructor(
    private readonly integrationTokenRepository: IntegrationTokenRepository
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const {
      headers: { authorization },
    } = context.switchToHttp().getRequest();

    if (!authorization) {
      throw new UnauthorizedException();
    }

    const token = authorization.replace('Bearer ', '');
    const integrationInstance = await this.integrationTokenRepository.getByValue(
      token
    );

    if (!integrationInstance) {
      throw new UnauthorizedException();
    }

    const req = context.switchToHttp().getRequest();
    req.user = integrationInstance.company;

    return true;
  }
}

export function IntegrationSecurity(...guards: (CanActivate | Function)[]) {
  return applyDecorators(
    ApiSecurity('bearer'),
    UseGuards(IntegrationAuthGuard, ...guards)
  );
}
