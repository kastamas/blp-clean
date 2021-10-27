import { PosResponseDto } from '@business-loyalty-program/types';
import { BranchBuilder } from '../../common/services/branch-builder';

interface IPosBranchData {
  original: PosResponseDto[];
  filtered: PosResponseDto[];
}

const {
  slice: posSlice,
  actions: posActions,
} = new BranchBuilder<IPosBranchData>()
  .setInitialData({
    original: [],
    filtered: [],
  })
  .defineActions((api) => ({
    async getPosList(_: void, { getState }) {
      const state: any = getState();
      const companyId = state.auth.data.user.companies[0].id;

      const data = await api.get<PosResponseDto[]>(
        `/companies/${companyId}/pos`
      );
      return {
        original: data,
        filtered: data,
      };
    },
    async applyFilter(filter: string, { getState }) {
      const state: any = getState();
      const original: PosResponseDto[] = state.pos.data.original;

      const filtered = original.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase())
      );

      return {
        original,
        filtered,
      };
    },
  }))
  .build('pos');

export { posSlice, posActions };
