import {
  ConflictException,
  HttpService,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AuthUtilsService } from './auth-utils.service';
import { randomInRange } from '../../../common/utils/random';
import { AuthWithCodeDto } from '@business-loyalty-program/types';
import { RedisService } from 'nestjs-redis';
import { UserModel, UserRepository } from '@business-loyalty-program/database';
import { SmsService } from './sms-service';

@Injectable()
export class PhoneAuthService {
  constructor(
    private readonly authUtilsService: AuthUtilsService,
    private readonly httpService: HttpService,
    private readonly redisService: RedisService,
    private readonly userRepository: UserRepository,
    private readonly smsService: SmsService
  ) {}

  private getCheckKey(phone: string) {
    return `${phone}:check`;
  }

  private getResultKey(phone: string) {
    return `${phone}:result`;
  }

  public async createCode(phone: string, validateExistence: boolean) {
    if (validateExistence) {
      const existingUser = await this.userRepository.getByAuthType(
        phone,
        'phone'
      );
      if (existingUser) {
        throw new ConflictException();
      }
    }

    const redisClient = this.redisService.getClient();
    const isNotExpired = await redisClient.get(this.getCheckKey(phone));
    if (isNotExpired) {
      throw new ConflictException();
    }

    const code = randomInRange(100000, 999999);

    await redisClient.setex(this.getCheckKey(phone), 60, 'true');
    await redisClient.setex(this.getResultKey(phone), 60 * 60, code);
    await this.smsService.sendMessage(phone, `Ваш код для входа: ${code}`);
  }

  private async validateCode(phone: string, code: string) {
    const redisClient = this.redisService.getClient();
    const codeToCheck = await redisClient.get(this.getResultKey(phone));

    if (!codeToCheck) {
      throw new NotFoundException();
    }

    if (code !== codeToCheck) {
      throw new UnprocessableEntityException();
    }

    await redisClient.del(this.getResultKey(phone), this.getCheckKey(phone));
  }

  public async auth({ phone, code }: AuthWithCodeDto) {
    await this.validateCode(phone, code);

    return this.authUtilsService.authByType({ phone }, phone, 'phone');
  }

  public async link({ phone, code }: AuthWithCodeDto, user: UserModel) {
    await this.validateCode(phone, code);

    return this.authUtilsService.linkUserToAuth(user, phone, 'phone', {
      phone,
    });
  }
}
