import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BonusesModule } from './bonuses/bonuses.module';
import { PosModule } from './pos/pos.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [AuthModule, UsersModule, BonusesModule, PosModule, FilesModule],
})
export class AppModule {}
