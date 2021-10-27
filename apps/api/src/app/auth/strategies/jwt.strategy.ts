import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { BaseJwtStrategy } from '@flexypw/auth';
import { CompanyModel } from '@business-loyalty-program/database';

@Injectable()
export class JwtStrategy extends BaseJwtStrategy<CompanyModel> {
  constructor(authService: AuthService) {
    super(authService);
  }
}
