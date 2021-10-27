import { Module } from '@nestjs/common';
import { DatabaseModule } from '@business-loyalty-program/database';
import { BonusesController } from './bonuses.controller';
import { BonusesService } from './bonuses.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BonusesController],
  providers: [BonusesService],
})
export class BonusesModule {}
