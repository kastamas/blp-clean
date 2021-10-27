import {
  ApiMethod,
  BaseApi,
  buildApiHooks,
  SuccessNotification,
} from '@flexypw/react-tools';
import {
  CompaniesResponseDto,
  CompaniesUpdateDto,
} from '@business-loyalty-program/types';
import { RcFile } from 'antd/es/upload';
import { FilesApi } from '../files/files.api';

export class CompaniesApi extends BaseApi {
  @ApiMethod()
  public getCurrentCompany(): Promise<CompaniesResponseDto> {
    return this.client.get('/companies/current');
  }

  @ApiMethod()
  @SuccessNotification('Данные сохранены')
  public updateCompany(
    id: string,
    body: CompaniesUpdateDto
  ): Promise<CompaniesResponseDto> {
    return this.client.put(`/companies/${id}`, body);
  }

  @ApiMethod()
  public async updateCompanyAvatar(id: string, file: RcFile) {
    const uploadedFile = await new FilesApi().uploadFile(file);

    return this.updateCompany(id, { imageId: uploadedFile.id });
  }
}

const {
  useGetCurrentCompany,
  useUpdateCompany,
  useUpdateCompanyAvatar,
} = buildApiHooks(CompaniesApi);

export { useGetCurrentCompany, useUpdateCompany, useUpdateCompanyAvatar };
