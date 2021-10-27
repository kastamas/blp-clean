import { BaseMobileApi } from '../../common/services/base-mobile-api';
import type { PosResponseDto } from '@business-loyalty-program/types';

export class PosApiService extends BaseMobileApi {
  public getPosList(companyId: string): Promise<PosResponseDto[]> {
    return this.client.get(`/companies/${companyId}/pos`);
  }
}
