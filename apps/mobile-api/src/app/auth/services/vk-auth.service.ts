import { HttpService, Injectable } from '@nestjs/common';
import { AuthUtilsService } from './auth-utils.service';
import { UserModel } from '@business-loyalty-program/database';

@Injectable()
export class VkAuthService {
  constructor(
    private readonly authUtilsService: AuthUtilsService,
    private readonly httpService: HttpService
  ) {}

  private async requestData(token: string) {
    const { data } = await this.httpService
      .get('https://api.vk.com/method/users.get', {
        params: {
          v: '5.130',
          access_token: token,
        },
      })
      .toPromise();

    const {
      response: [{ ...result }],
    } = data;

    return result;
  }

  public async auth(token: string) {
    const { first_name, id, last_name } = await this.requestData(token);

    return this.authUtilsService.authByType(
      { name: first_name, surname: last_name, vkId: id },
      String(id),
      'vk'
    );
  }

  public async link(token: string, user: UserModel) {
    const { id, first_name, last_name } = await this.requestData(token);

    return this.authUtilsService.linkUserToAuth(user, id, 'vk', {
      name: first_name,
      surname: last_name,
    });
  }
}
