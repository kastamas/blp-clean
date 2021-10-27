import {
  ControllerWithDocs,
  GetWithDocs,
  PutWithDocs,
} from '@flexypw/backend-core';
import { JwtSecurity, User } from '@flexypw/auth';
import { UserModel } from '@business-loyalty-program/database';
import {
  UsersMobileResponseDto,
  UserUpdateMobileDto,
} from '@business-loyalty-program/types';
import { Body } from '@nestjs/common';
import { UsersService } from './users.service';

@ControllerWithDocs('/users', 'Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GetWithDocs('/current', UsersMobileResponseDto)
  @JwtSecurity()
  public getCurrent(@User() user: UserModel) {
    return user;
  }

  @PutWithDocs('/current', UsersMobileResponseDto)
  @JwtSecurity()
  public updateCurrent(
    @User() user: UserModel,
    @Body() body: UserUpdateMobileDto
  ) {
    return this.usersService.updateUser(user, body);
  }
}
