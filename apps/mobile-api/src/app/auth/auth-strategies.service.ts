import { Injectable } from '@nestjs/common';
import { IJwtAuthService } from '@flexypw/auth';
import { UserModel, UserRepository } from '@business-loyalty-program/database';

@Injectable()
export class AuthStrategiesService implements IJwtAuthService<UserModel> {
  constructor(private readonly userRepository: UserRepository) {}

  public async getUserJwtStrategy(id: string): Promise<UserModel> {
    const user = await this.userRepository.getById(id);
    this.checkUser(user);

    return user;
  }

  private checkUser(user?: UserModel) {}
}
