import { BranchBuilder } from '../../../common/services/branch-builder';
import { BalanceResponseDto } from '@business-loyalty-program/types';

const {
  slice: bonusesBalanceSlice,
  actions: bonusesBalanceActions,
} = new BranchBuilder<number>()
  .setInitialData(0)
  .defineActions((api) => ({
    async getBalance(_: void, { getState }) {
      const state: any = getState();
      const companyId = state.auth.data.user.companies[0].id;

      const { balance } = await api.get<BalanceResponseDto>(
        `/company/${companyId}/bonuses/balance`
      );

      return balance;
    },
  }))
  .build('bonusesBalance');

export { bonusesBalanceSlice, bonusesBalanceActions };
