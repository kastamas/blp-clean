import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { BaseLocalStrategy } from '@flexypw/auth';
import { CompanyModel } from '@business-loyalty-program/database';

@Injectable()
export class LocalStrategy extends BaseLocalStrategy<CompanyModel> {
  constructor(authService: AuthService) {
    super(authService, 'email');
  }
}
