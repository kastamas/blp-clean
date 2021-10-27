import { HttpService, Injectable } from '@nestjs/common';
import { AuthUtilsService } from './auth-utils.service';
import { UserModel } from '@business-loyalty-program/database';

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly authUtilsService: AuthUtilsService,
    private readonly httpService: HttpService
  ) {}

  private async requestData(token: string) {
    const { data } = await this.httpService
      .get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .toPromise();
    console.log(data);

    return data;
  }

  public async auth(token: string) {
    const { id, given_name, family_name, email } = await this.requestData(
      token
    );

    return this.authUtilsService.authByType(
      { name: given_name, surname: family_name, googleId: id, email },
      String(id),
      'google'
    );
  }

  public async link(token: string, user: UserModel) {
    const { id, given_name, family_name, email } = await this.requestData(
      token
    );

    return this.authUtilsService.linkUserToAuth(user, id, 'google', {
      name: given_name,
      surname: family_name,
      email,
    });
  }
}
