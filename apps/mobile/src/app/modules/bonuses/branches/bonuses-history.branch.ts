import { BranchBuilder } from '../../../common/services/branch-builder';
import type { BonusTransactionResponseMobileDto } from '@business-loyalty-program/types';
import { EBonusesType } from '@business-loyalty-program/enums';

const {
  slice: bonusesHistorySlice,
  actions: bonusesHistoryActions,
} = new BranchBuilder<BonusTransactionResponseMobileDto[]>()
  .setInitialData([])
  .defineActions((api) => ({
    async getHistory(type: EBonusesType, { getState }) {
      const state = getState() as any;
      const companyId = state.auth.data.user.companies[0].id;

      return api.get<BonusTransactionResponseMobileDto[]>(
        `/company/${companyId}/bonuses`,
        {
          params: { type },
        }
      );
    },
  }))
  .build('bonusesHistory');

export { bonusesHistorySlice, bonusesHistoryActions };
