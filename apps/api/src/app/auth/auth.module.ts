import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailAuthModule, JwtAuthModule } from '@flexypw/auth';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DatabaseModule } from '@business-loyalty-program/database';

@Module({
  imports: [
    EmailAuthModule.register({
      imports: [DatabaseModule],
      providers: [LocalStrategy, AuthService],
    }),
    JwtAuthModule.register({
      imports: [DatabaseModule],
      providers: [JwtStrategy, AuthService],
    }),
  ],
})
export class AuthModule {}
