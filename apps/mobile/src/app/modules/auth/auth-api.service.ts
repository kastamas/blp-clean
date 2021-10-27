import { BaseMobileApi } from '../../common/services/base-mobile-api';
import type {
  SocialAuthBody,
  TSupportedAuthTypes,
  AuthWithCodeDto,
} from '@business-loyalty-program/types';
import type { TokenResponseDto } from '@flexypw/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import VKLogin from 'react-native-vkontakte-login';

export class AuthApiService extends BaseMobileApi {
  public checkGoogle(body: SocialAuthBody): Promise<TokenResponseDto> {
    return this.client.post('/auth/google', body);
  }

  public checkVk(body: SocialAuthBody): Promise<TokenResponseDto> {
    return this.client.post('/auth/vk', body);
  }

  public async authorizeSocial(type: TSupportedAuthTypes) {
    switch (type) {
      case 'vk': {
        const token = await this.authorizeVk();
        const { accessToken } = await this.checkVk({ token });
        return accessToken;
      }
      case 'google': {
        const token = await this.authorizeGoogle();
        const { accessToken } = await this.checkGoogle({ token });
        return accessToken;
      }
      default:
        throw new Error('Unsupported social type');
    }
  }

  public async createCode(phone: string): Promise<void> {
    await this.client.post('/auth/code', { phone });
  }

  public authorizeCode(body: AuthWithCodeDto): Promise<TokenResponseDto> {
    return this.client.post('/auth/code/users', body);
  }

  private async authorizeVk() {
    const isLoggedIn = await VKLogin.isLoggedIn();

    if (!isLoggedIn) {
      const { access_token } = await VKLogin.login(['photos', 'email']);
      return access_token;
    } else {
      const { access_token } = await VKLogin.getAccessToken();
      return access_token;
    }
  }

  private async authorizeGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      console.log('play service granted');
      await GoogleSignin.signIn();
      console.log('singed in');
      const { accessToken } = await GoogleSignin.getTokens();
      console.log('token acquired');

      return accessToken;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('canceled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('progres');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('not available');
      } else {
        console.log(error);
        console.log('unknown error');
      }
    }
  }
}
