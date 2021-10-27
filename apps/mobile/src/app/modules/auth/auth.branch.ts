import type {
  AuthWithCodeDto,
  TSupportedAuthTypes,
  UsersMobileResponseDto,
} from '@business-loyalty-program/types';
import { BranchBuilder } from '../../common/services/branch-builder';
import { MMKV } from 'react-native-mmkv';
import { AuthApiService } from './auth-api.service';
import { UsersApiService } from '../users/users-api.service';
import { Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import VKLogin from 'react-native-vkontakte-login';

export enum EAuthState {
  Initial = 'initial',
  LoggedIn = 'logged-in',
  LoggedOut = 'logged-out',
}

interface IAuthBranchData {
  authState: EAuthState;
  user: UsersMobileResponseDto | null;
}

const {
  slice: authSlice,
  actions: authActions,
} = new BranchBuilder<IAuthBranchData>()
  .setInitialData({
    authState: EAuthState.Initial,
    user: null,
  })
  .defineActions((api) => ({
    async checkAuth() {
      try {
        const token = MMKV.getString('accessToken');

        if (token) {
          const user = await api.get<UsersMobileResponseDto>('/users/current');
          return {
            user,
            authState: EAuthState.LoggedIn,
          };
        } else {
          return {
            user: null,
            authState: EAuthState.LoggedOut,
          };
        }
      } catch (error) {
        MMKV.delete('accessToken');
        console.error(error);
        return {
          user: null,
          authState: EAuthState.LoggedOut,
        };
      }
    },
    async singInSocial(type: TSupportedAuthTypes) {
      const accessToken = await new AuthApiService().authorizeSocial(type);
      MMKV.set('accessToken', accessToken);
      const user = await new UsersApiService().getCurrentUser();

      return {
        user,
        authState: EAuthState.LoggedIn,
      };
    },
    async setUser(user: UsersMobileResponseDto) {
      return {
        user,
        authState: EAuthState.LoggedIn,
      };
    },
    async singInCode(body: AuthWithCodeDto, { getState }) {
      const state: any = getState();
      const userFromState = state.auth.data.user;
      try {
        const { accessToken } = await new AuthApiService().authorizeCode(body);

        MMKV.set('accessToken', accessToken);
        const user = await new UsersApiService().getCurrentUser();

        return {
          user,
          authState: EAuthState.LoggedIn,
        };
      } catch (err) {
        const status = err?.response?.status;

        switch (status) {
          case 422:
            Alert.alert('Неправильный код');
            break;
          case 404:
            Alert.alert('Срок действия кода истек');
            break;
          case 409:
            Alert.alert('Номер уже привязан');
            break;
          default:
            Alert.alert('Непредвиденная ошибка');
            break;
        }

        if (userFromState) {
          return {
            user: userFromState,
            authState: EAuthState.LoggedIn,
          };
        } else {
          return {
            user: null,
            authState: EAuthState.LoggedOut,
          };
        }
      }
    },
    async singOut() {
      try {
        const isSignInGoogle = await GoogleSignin.isSignedIn();
        if (isSignInGoogle) {
          await GoogleSignin.signOut();
        }

        const isSignInVk = await VKLogin.isLoggedIn();
        if (isSignInVk) {
          await VKLogin.logout()
        }

        MMKV.delete('accessToken');

        return {
          user: null,
          authState: EAuthState.LoggedOut,
        };
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  }))
  .build('auth');

export { authSlice, authActions };
