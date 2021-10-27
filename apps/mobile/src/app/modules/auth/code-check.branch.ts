import { BranchBuilder } from '../../common/services/branch-builder';
import { AuthApiService } from './auth-api.service';

const { slice: codeCheckSlice, actions: codeCheckActions } = new BranchBuilder<
  number | null
>()
  .defineActions((api) => ({
    async createCode(phone: string) {
      await new AuthApiService().createCode(phone);

      return new Date().getTime();
    },
  }))
  .build('codeCheck');

export { codeCheckSlice, codeCheckActions };
