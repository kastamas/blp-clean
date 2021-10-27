import { Module } from '@nestjs/common';
import { DatabaseModule } from '@business-loyalty-program/database';
import { PosController } from './pos.controller';
import { PosService } from './pos.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PosController],
  providers: [PosService],
})
export class PosModule {}
