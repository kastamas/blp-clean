import {
  ClassSerializerInterceptor,
  Controller,
  NotFoundException,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { GetWithDocs } from '@flexypw/backend-core';
import { IntegrationSecurity } from '../../common/guards/integration-auth.guard';
import { User } from '@flexypw/auth';
import {
  CompanyModel,
  UserRepository,
} from '@business-loyalty-program/database';
import {
  IntegrationQueryDto,
  UsersCollectionDto,
  UsersCollectionQueryDto,
  UsersResponseDto,
} from '@business-loyalty-program/types';

@Controller()
export class UsersController {
  constructor(private readonly userRepository: UserRepository) {}

  @GetWithDocs('/users', UsersResponseDto)
  @IntegrationSecurity()
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    excludeExtraneousValues: true,
  })
  public async getUser(
    @User() company: CompanyModel,
    @Query() { query }: IntegrationQueryDto
  ) {
    const user = await this.userRepository.getByQuery(query);

    if (!user) {
      throw new NotFoundException();
    }

    return await this.userRepository.getCompanyUser(company, user.id);
  }

  @GetWithDocs('/users/collection', UsersCollectionDto)
  @IntegrationSecurity()
  @UseInterceptors(ClassSerializerInterceptor)
  public getCompanyUsers(
    @User() company: CompanyModel,
    @Query() query: UsersCollectionQueryDto
  ) {
    return this.userRepository.getCompanyUsers(company, query);
  }
}
