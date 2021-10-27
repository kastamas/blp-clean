import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { FilesModule } from './files/files.module';
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { BonusesModule } from './bonuses/bonuses.module';
import { PosModule } from './pos/pos.module';
import { IntegrationModule } from './integration/integration.module';
import { AddressModule } from '@flexypw/address';

@Module({
  imports: [
    AuthModule,
    FilesModule,
    CompaniesModule,
    SettingsModule,
    UsersModule,
    TransactionsModule,
    BonusesModule,
    PosModule,
    IntegrationModule,
    AddressModule,
  ],
})
export class AppModule {}
