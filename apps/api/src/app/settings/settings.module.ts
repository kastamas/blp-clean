import { Module } from '@nestjs/common';
import { DatabaseModule } from '@business-loyalty-program/database';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule {}
