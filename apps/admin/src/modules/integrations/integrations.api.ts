import { ApiMethod, BaseApi, buildApiHooks } from '@flexypw/react-tools';
import {
  IntegrationCollectionDto,
  IntegrationCollectionQueryDto,
  IntegrationResponseDto,
  NewIntegrationDto,
} from '@business-loyalty-program/types';
import { v4 } from 'uuid';

export class IntegrationsApi extends BaseApi {
  @ApiMethod()
  public getIntegrations(
    params: IntegrationCollectionQueryDto
  ): Promise<IntegrationCollectionDto> {
    return this.client.get(`/integration`, { params });
  }

  @ApiMethod()
  public addIntegration(
    body: NewIntegrationDto
  ): Promise<IntegrationResponseDto> {
    return this.client.post(`/integration`, body);
  }

  @ApiMethod()
  public async deleteIntegration(id: string): Promise<string> {
    await this.client.delete(`/integration/${id}`);
    return v4();
  }
}

const {
  useGetIntegrations,
  useAddIntegration,
  useDeleteIntegration,
} = buildApiHooks(IntegrationsApi);

export { useGetIntegrations, useAddIntegration, useDeleteIntegration };
