import { Module } from '@nestjs/common';
import { DatabaseModule } from '@business-loyalty-program/database';
import { PosService } from './pos.service';
import { PosController } from './pos.controller';

@Module({
  imports: [DatabaseModule],
  providers: [PosService],
  controllers: [PosController],
})
export class PosModule {}
