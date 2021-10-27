import { Controller, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetWithDocs } from '@flexypw/backend-core';
import { JwtSecurity, User } from '@flexypw/auth';
import { UserModel } from '@business-loyalty-program/database';
import { BonusesService } from './bonuses.service';
import {
  BalanceResponseDto,
  BonusesMobileQueryDto,
  BonusTransactionResponseMobileDto,
} from '@business-loyalty-program/types';
import { UserCompanyAccessGuard } from '../../common/guards/user-company-access.guard';

@Controller()
@ApiTags('Bonuses')
export class BonusesController {
  constructor(private readonly bonusesService: BonusesService) {}

  @GetWithDocs('/company/:id/bonuses/balance', BalanceResponseDto)
  @JwtSecurity(UserCompanyAccessGuard)
  public async getBalance(@Param('id') id: string, @User() user: UserModel) {
    const balance = await this.bonusesService.getBalance(id, user.id);

    return { balance };
  }

  @GetWithDocs('/company/:id/bonuses', BonusTransactionResponseMobileDto, true)
  @JwtSecurity(UserCompanyAccessGuard)
  public async getBonusesCollection(
    @Param('id') id: string,
    @User() user: UserModel,
    @Query() { type }: BonusesMobileQueryDto
  ) {
    return this.bonusesService.getBonusesHistory(id, user.id, type);
  }
}
