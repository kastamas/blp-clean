import {
  ApiMethod,
  BaseApi,
  buildApiHooks,
  SuccessNotification,
} from '@flexypw/react-tools';
import { NewManualBonusTransactionDto } from '@business-loyalty-program/types';
import { v4 } from 'uuid';

export class BonusesApi extends BaseApi {
  @ApiMethod()
  @SuccessNotification('Действие выполнено')
  public async postCompanyUserBonuses(
    companyId: string,
    userId: string,
    body: NewManualBonusTransactionDto
  ): Promise<string> {
    await this.client.post(
      `/companies/${companyId}/users/${userId}/bonuses`,
      body
    );

    return v4();
  }
}

const { usePostCompanyUserBonuses } = buildApiHooks(BonusesApi);

export { usePostCompanyUserBonuses };
