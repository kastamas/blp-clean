import { DatabaseBaseModule } from '@flexypw/database';
import { CompanyModel } from './entities/company/company.model';
import { CustomImageModel } from './entities/custom-image/custom-image.model';
import { PosModel } from './entities/pos/pos.model';
import { SettingsModel } from './entities/settings/settings.model';
import { UserModel } from './entities/user/user.model';
import { CompanyRepository } from './entities/company/company.repository';
import { CustomImageRepository } from './entities/custom-image/custom-image.repository';
import { UserRepository } from './entities/user/user.repository';
import { TransactionModel } from './entities/transaction/transaction.model';
import { BonusTransactionModel } from './entities/bonus-transaction/bonus-transaction.model';
import { SettingsRepository } from './entities/settings/settings.repository';
import { BonusTransactionRepository } from './entities/bonus-transaction/bonus-transaction.repository';
import { TransactionRepository } from './entities/transaction/transaction.repository';
import { PosRepository } from './entities/pos/pos.repository';
import { IntegrationTokenModel } from './entities/integration-token/integration-token.model';
import { IntegrationTokenRepository } from './entities/integration-token/integration-token.repository';

export const DatabaseModule = DatabaseBaseModule.register(
  {
    entities: [
      CompanyModel,
      CustomImageModel,
      PosModel,
      SettingsModel,
      UserModel,
      TransactionModel,
      BonusTransactionModel,
      IntegrationTokenModel,
    ],
    repositories: [
      CompanyRepository,
      CustomImageRepository,
      UserRepository,
      SettingsRepository,
      BonusTransactionRepository,
      TransactionRepository,
      PosRepository,
      IntegrationTokenRepository,
    ],
  },
  {
    logging: true,
  }
);
