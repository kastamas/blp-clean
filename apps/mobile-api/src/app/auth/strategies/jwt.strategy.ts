import { Injectable } from '@nestjs/common';
import { BaseJwtStrategy } from '@flexypw/auth';
import { UserModel } from '@business-loyalty-program/database';
import { AuthStrategiesService } from '../auth-strategies.service';

@Injectable()
export class JwtStrategy extends BaseJwtStrategy<UserModel> {
  constructor(authService: AuthStrategiesService) {
    super(authService);
  }
}
