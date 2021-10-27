import {
  ApiMethod,
  BaseApi,
  buildApiHooks,
  SuccessNotification,
} from '@flexypw/react-tools';
import {
  SettingsResponseDto,
  SettingsUpdateDto,
} from '@business-loyalty-program/types';

export class SettingsApi extends BaseApi {
  @ApiMethod()
  public getCompanySettings(id: string): Promise<SettingsResponseDto> {
    return this.client.get(`/companies/${id}/settings`);
  }

  @ApiMethod()
  @SuccessNotification('Настройки сохранены')
  public putCompanySettings(
    id: string,
    body: SettingsUpdateDto
  ): Promise<SettingsResponseDto> {
    return this.client.put(`/companies/${id}/settings`, body);
  }
}

const { useGetCompanySettings, usePutCompanySettings } = buildApiHooks(
  SettingsApi
);

export { useGetCompanySettings, usePutCompanySettings };
