import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EBonusTransactionType } from '@business-loyalty-program/enums';
import {
  BonusTransactionRepository,
  CompanyModel,
  PosRepository,
  TransactionRepository,
  UserRepository,
} from '@business-loyalty-program/database';
import { NewIntegrationTransaction } from '@business-loyalty-program/types';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly posRepository: PosRepository,
    private readonly userRepository: UserRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly bonusTransactionRepository: BonusTransactionRepository
  ) {}

  public async performTransaction(
    {
      posId,
      userId,
      bonusAmount,
      amount,
      externalId,
      description,
    }: NewIntegrationTransaction,
    company: CompanyModel
  ) {
    const pos = await this.posRepository.getByIdOrExternalId(posId);
    if (!pos) {
      throw new NotFoundException({
        message: 'POS is not found',
      });
    }
    const { bonusAmount: remainingAmount } =
      await this.userRepository.getCompanyUser(company, userId);
    const user = await this.userRepository.getById(userId);

    const transaction = await this.transactionRepository.create({
      user,
      pos,
      amount,
      externalId,
      description,
    });

    if (bonusAmount) {
      if (bonusAmount > Number(remainingAmount)) {
        throw new ConflictException();
      }

      await this.bonusTransactionRepository.create({
        user,
        company,
        transaction,
        type: EBonusTransactionType.POS,
        amount: -bonusAmount,
      });
    } else {
      const bonusPercent = company.settings.bonusPolicy.reduce(
        (accum, current, index, array) => {
          if (accum) {
            return accum;
          }

          const nextValue = array[index + 1];
          if (nextValue) {
            if (amount >= current.from && amount < nextValue.from) {
              return current.percent;
            }
          } else {
            if (amount >= current.from) {
              return current.percent;
            }
          }

          return accum;
        },
        null as number | null
      );

      if (bonusPercent) {
        await this.bonusTransactionRepository.create({
          user,
          company,
          transaction,
          type: EBonusTransactionType.POS,
          amount: Math.ceil(amount * bonusPercent),
        });
      }
    }
  }
}
