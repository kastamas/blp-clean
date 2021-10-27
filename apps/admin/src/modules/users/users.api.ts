import { ApiMethod, BaseApi, buildApiHooks } from '@flexypw/react-tools';
import {
  NewUserDto,
  UsersCollectionDto,
  UsersCollectionQueryDto,
  UsersResponseDto,
} from '@business-loyalty-program/types';

export class UsersApi extends BaseApi {
  @ApiMethod()
  public getCompanyUsers(
    id: string,
    params: UsersCollectionQueryDto
  ): Promise<UsersCollectionDto> {
    return this.client.get(`/companies/${id}/users`, { params });
  }

  @ApiMethod()
  public getCompanyUser(id: string, userId: string): Promise<UsersResponseDto> {
    return this.client.get(`/companies/${id}/users/${userId}`);
  }

  @ApiMethod()
  public getUsersReport(id: string) {
    return this.client
      .get(`/companies/${id}/users/report`, {
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
  public addCompanyUser(
    id: string,
    body: NewUserDto
  ): Promise<UsersResponseDto> {
    return this.client.post(`/companies/${id}/users`, body);
  }
}

const {
  useGetCompanyUsers,
  useGetUsersReport,
  useAddCompanyUser,
  useGetCompanyUser,
} = buildApiHooks(UsersApi);

export {
  useGetCompanyUsers,
  useGetUsersReport,
  useAddCompanyUser,
  useGetCompanyUser,
};
