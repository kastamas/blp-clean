import { Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PosService } from './pos.service';
import { GetWithDocs } from '@flexypw/backend-core';
import { PosResponseDto } from '@business-loyalty-program/types';
import { JwtSecurity } from '@flexypw/auth';
import { Entity } from '@flexypw/database';
import { CompanyModel } from '@business-loyalty-program/database';
import { UserCompanyAccessGuard } from '../../common/guards/user-company-access.guard';

@Controller()
@ApiTags('POS')
export class PosController {
  constructor(private readonly posService: PosService) {}

  @GetWithDocs('/companies/:id/pos', PosResponseDto, true)
  @JwtSecurity(UserCompanyAccessGuard)
  public async getCollection(
    @Param('id') id: string,
    @Entity() company: CompanyModel
  ) {
    const [list] = await this.posService.getList(company);

    return list;
  }
}
