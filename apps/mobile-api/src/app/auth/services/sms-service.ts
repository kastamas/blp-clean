import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class SmsService {
  constructor(private readonly httpService: HttpService) {}

  public async sendMessage(phone: string, message: string) {
    await this.httpService
      .get('https://smsc.ru/sys/send.php', {
        params: {
          login: process.env.SMS_LOGIN,
          psw: process.env.SMS_PASSWORD,
          phones: phone,
          mes: message,
        },
      })
      .toPromise();
  }
}
