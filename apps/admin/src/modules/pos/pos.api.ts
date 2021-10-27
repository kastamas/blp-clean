import { ApiMethod, BaseApi, buildApiHooks } from '@flexypw/react-tools';
import {
  NewPosDto,
  PosCollectionDto,
  PosCollectionQueryDto,
  PosResponseDto,
  PosUpdateDto,
} from '@business-loyalty-program/types';

export class POSApi extends BaseApi {
  @ApiMethod()
  public getCompanyPOS(
    id: string,
    params: PosCollectionQueryDto
  ): Promise<PosCollectionDto> {
    return this.client.get(`/companies/${id}/pos`, { params });
  }

  @ApiMethod()
  public addCompanyPOS(id: string, body: NewPosDto): Promise<PosResponseDto> {
    return this.client.post(`/companies/${id}/pos`, body);
  }

  @ApiMethod()
  public editPOS(
    id: string,
    body: PosUpdateDto
  ): Promise<PosResponseDto> {
    return this.client.put(`/pos/${id}`, body);
  }
}

const { useGetCompanyPOS, useAddCompanyPOS, useEditPOS } = buildApiHooks(POSApi);

export { useGetCompanyPOS, useAddCompanyPOS, useEditPOS };
