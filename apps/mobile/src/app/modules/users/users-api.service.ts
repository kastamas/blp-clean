import { BaseMobileApi } from '../../common/services/base-mobile-api';
import type {
  UsersMobileResponseDto,
  UserUpdateMobileDto,
} from '@business-loyalty-program/types';

export class UsersApiService extends BaseMobileApi {
  public getCurrentUser(): Promise<UsersMobileResponseDto> {
    return this.client.get('/users/current');
  }

  public updateCurrentUser(
    body: UserUpdateMobileDto
  ): Promise<UsersMobileResponseDto> {
    return this.client.put('/users/current', body);
  }
}
