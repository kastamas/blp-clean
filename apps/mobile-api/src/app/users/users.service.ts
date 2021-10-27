import { Injectable } from '@nestjs/common';
import {
  CustomImageRepository,
  UserModel,
  UserRepository,
} from '@business-loyalty-program/database';
import { UserUpdateMobileDto } from '@business-loyalty-program/types';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly customImageRepository: CustomImageRepository
  ) {}

  public async updateUser(
    user: UserModel,
    { imageId, ...body }: UserUpdateMobileDto
  ) {
    if (user.dateOfBirth) {
      delete body.dateOfBirth;
    }

    return this.userRepository.update(user, {
      ...body,
      ...(await this.customImageRepository.getImageEntityPart(imageId)),
    });
  }
}
