import { Module } from '@nestjs/common';
import { DatabaseModule } from '@business-loyalty-program/database';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
})
export class UsersModule {}
