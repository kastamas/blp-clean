import { configureStore } from '@reduxjs/toolkit';
import { bonusesBalanceSlice } from '../modules/bonuses/branches/bonuses-balance.branch';
import { authSlice } from '../modules/auth/auth.branch';
import { bonusesHistorySlice } from '../modules/bonuses/branches/bonuses-history.branch';
import { posSlice } from '../modules/pos/pos.branch';
import { locationSlice } from '../modules/location/location.branch';
import { codeCheckSlice } from '../modules/auth/code-check.branch';

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [bonusesBalanceSlice.name]: bonusesBalanceSlice.reducer,
    [bonusesHistorySlice.name]: bonusesHistorySlice.reducer,
    [posSlice.name]: posSlice.reducer,
    [locationSlice.name]: locationSlice.reducer,
    [codeCheckSlice.name]: codeCheckSlice.reducer,
  },
});
