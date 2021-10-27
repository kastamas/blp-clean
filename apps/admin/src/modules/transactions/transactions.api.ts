import { ApiMethod, BaseApi, buildApiHooks } from '@flexypw/react-tools';
import {
  TransactionsCollectionDto,
  TransactionsCollectionQueryDto,
  UserBonusTransactionCollectionDto,
  UserBonusTransactionCollectionQueryDto,
} from '@business-loyalty-program/types';

export class TransactionsApi extends BaseApi {
  @ApiMethod()
  public getCompanyTransactions(
    id: string,
    params: TransactionsCollectionQueryDto
  ): Promise<TransactionsCollectionDto> {
    return this.client.get(`/companies/${id}/transactions`, { params });
  }

  @ApiMethod()
  public getCompanyTransactionsReport(id: string) {
    return this.client
      .get(`/companies/${id}/transactions/report`, {
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response as any], {
            type:
              'vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
          })
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.xlsx');
        document.body.appendChild(link);
        link.click();
      });
  }

  @ApiMethod()
  public getCompanyUserTransactions(
    id: string,
    userId: string,
    params: UserBonusTransactionCollectionQueryDto
  ): Promise<UserBonusTransactionCollectionDto> {
    return this.client.get(`/companies/${id}/users/${userId}/transactions`, {
      params,
    });
  }
}

const {
  useGetCompanyTransactions,
  useGetCompanyUserTransactions,
  useGetCompanyTransactionsReport,
} = buildApiHooks(TransactionsApi);

export {
  useGetCompanyTransactions,
  useGetCompanyTransactionsReport,
  useGetCompanyUserTransactions,
};
