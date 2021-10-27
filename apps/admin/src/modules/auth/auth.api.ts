import { ApiMethod, BaseApi, buildApiHooks } from '@flexypw/react-tools';
import { EmailLoginBodyDto, TokenResponseDto } from '@flexypw/auth';

export class AuthApi extends BaseApi {
  @ApiMethod()
  public async auth(body: EmailLoginBodyDto): Promise<string> {
    const { accessToken }: TokenResponseDto = await this.client.post(
      '/auth',
      body
    );

    document.cookie = 'accessToken=' + accessToken;

    return accessToken;
  }
}

const { useAuth } = buildApiHooks(AuthApi);

export { useAuth };
