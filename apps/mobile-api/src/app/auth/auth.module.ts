import { HttpModule, Module } from '@nestjs/common';
import { BaseAuthModule, JwtAuthModule } from '@flexypw/auth';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DatabaseModule } from '@business-loyalty-program/database';
import { AuthController } from './auth.controller';
import { AuthStrategiesService } from './auth-strategies.service';
import { RedisModule } from 'nestjs-redis';
import { AuthUtilsService } from './services/auth-utils.service';
import { GoogleAuthService } from './services/google-auth.service';
import { VkAuthService } from './services/vk-auth.service';
import { PhoneAuthService } from './services/phone-auth.service';
import { SmsService } from './services/sms-service';

@Module({
  imports: [
    DatabaseModule,
    BaseAuthModule,
    RedisModule.register({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    }),
    JwtAuthModule.register({
      imports: [DatabaseModule],
      providers: [JwtStrategy, AuthStrategiesService],
    }),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthUtilsService,
    GoogleAuthService,
    VkAuthService,
    PhoneAuthService,
    SmsService,
  ],
})
export class AuthModule {}
