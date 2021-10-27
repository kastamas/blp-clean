import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createDefaultAxiosClient } from './base-mobile-api';

interface IAsyncBranch<Data> {
  data: Data;
  loading: boolean;
  error: any;
}
interface IThunkApi {
  getState(): unknown;
}

type TAsyncAction<BranchData> = (
  args?: string | number | void | Record<string, any>,
  thunkApi?: IThunkApi
) => Promise<Partial<BranchData>>;

type TAsyncActions<BranchData> = Record<string, TAsyncAction<BranchData>>;

type TGeneratedActions<
  BranchData,
  AsyncActions extends TAsyncActions<BranchData>
> = {
  [Key in keyof AsyncActions]: AsyncThunk<
    BranchData,
    Parameters<AsyncActions[Key]>[0],
    {}
  >;
};

interface IEnhancedAxiosInstance extends AxiosInstance {
  get<Response>(url: string, config?: AxiosRequestConfig): Promise<Response>;
  put<Response>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<Response>;
  post<Response>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<Response>;
  delete<Response>(url: string, config?: AxiosRequestConfig): Promise<Response>;
}

export class BranchBuilder<
  BranchData,
  AsyncActions extends TAsyncActions<BranchData> = never
> {
  private initialData?: BranchData;
  private asyncActions?: AsyncActions;

  public defineActions<Actions extends TAsyncActions<BranchData>>(
    actionsCreator: (api: IEnhancedAxiosInstance) => Actions
  ): BranchBuilder<BranchData, Actions> {
    this.asyncActions = actionsCreator(createDefaultAxiosClient()) as any;

    return this as any;
  }

  public setInitialData(data: BranchData) {
    this.initialData = data;
    return this;
  }

  public build<Name extends string>(branchName: Name) {
    const thunks = this.buildThunks(branchName);

    const slice = createSlice({
      name: branchName,
      initialState: {
        loading: false,
        error: null,
        data: typeof this.initialData === 'undefined' ? null : this.initialData,
      } as IAsyncBranch<BranchData>,
      reducers: {},
      extraReducers: (builder) => {
        for (const thunk of Object.values(thunks)) {
          builder.addCase(thunk.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.data = payload;
          });
          builder.addCase(thunk.pending, (state) => {
            state.loading = true;
            state.error = null;
          });
          builder.addCase(thunk.rejected, (state, payload) => {
            state.loading = false;
            state.error = payload;
          });
        }
      },
    });

    return {
      slice,
      actions: thunks as TGeneratedActions<BranchData, AsyncActions>,
    };
  }

  private buildThunks(branchName: string) {
    const result: Record<string, AsyncThunk<any, any, any>> = {};
    if (this.asyncActions) {
      for (const [key, value] of Object.entries(this.asyncActions)) {
        result[key] = createAsyncThunk(
          `${branchName}/${key}`,
          async (params: any, thunkApi) => {
            return await value(params, { getState: thunkApi.getState } as any);
          }
        );
      }
    }

    return result;
  }
}
