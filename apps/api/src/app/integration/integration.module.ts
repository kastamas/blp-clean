import { Module } from '@nestjs/common';
import { DatabaseModule } from '@business-loyalty-program/database';
import { IntegrationService } from './integration.service';
import { IntegrationController } from './integration.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [IntegrationController],
  providers: [IntegrationService],
})
export class IntegrationModule {}
