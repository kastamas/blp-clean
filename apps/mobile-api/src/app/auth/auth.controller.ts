import { ControllerWithDocs, PostWithDocs } from '@flexypw/backend-core';
import { JwtSecurityOptional, TokenResponseDto, User } from '@flexypw/auth';
import { Body } from '@nestjs/common';
import {
  AuthWithCodeDto,
  CreateCodeDto,
  SocialAuthBody,
} from '@business-loyalty-program/types';
import { UserModel } from '@business-loyalty-program/database';
import { GoogleAuthService } from './services/google-auth.service';
import { VkAuthService } from './services/vk-auth.service';
import { PhoneAuthService } from './services/phone-auth.service';

@ControllerWithDocs('/auth', 'Authentication')
export class AuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly vkAuthService: VkAuthService,
    private readonly phoneAuthService: PhoneAuthService
  ) {}

  @PostWithDocs('/google', TokenResponseDto)
  @JwtSecurityOptional()
  public async authWithGoogle(
    @Body() { token }: SocialAuthBody,
    @User() user?: UserModel
  ) {
    if (user) {
      return this.googleAuthService.link(token, user);
    } else {
      return this.googleAuthService.auth(token);
    }
  }

  @PostWithDocs('/vk', TokenResponseDto)
  @JwtSecurityOptional()
  public async authWithVk(
    @Body() { token }: SocialAuthBody,
    @User() user?: UserModel
  ) {
    if (user) {
      return this.vkAuthService.link(token, user);
    } else {
      return this.vkAuthService.auth(token);
    }
  }

  @PostWithDocs('/code')
  @JwtSecurityOptional()
  public async createCode(
    @Body() { phone }: CreateCodeDto,
    @User() user?: UserModel
  ) {
    await this.phoneAuthService.createCode(phone, !!user);
  }

  @PostWithDocs('/code/users', TokenResponseDto)
  @JwtSecurityOptional()
  public authWithCode(@Body() body: AuthWithCodeDto, @User() user?: UserModel) {
    if (user) {
      return this.phoneAuthService.link(body, user);
    } else {
      return this.phoneAuthService.auth(body);
    }
  }
}
