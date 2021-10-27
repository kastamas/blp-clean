import {
  TransactionModel,
  UserModel,
} from '@business-loyalty-program/database';

export class TransactionReportMapper {
  constructor(private readonly data: TransactionModel[]) {}

  private mapClient(user: UserModel) {
    const { name = '', surname = '', phone, id } = user;

    if (name && surname) {
      return `${name} ${surname}`;
    }

    if (name) {
      return `${name}`;
    }

    if (surname) {
      return `${surname}`;
    }

    if (phone) {
      return `${phone}`;
    }

    return id;
  }

  public map() {
    return this.data.map((item) => ({
      createdAt: item.createdAt,
      client: this.mapClient(item.user),
      pos: item.pos.name,
      bonusAmount: item.bonusTransaction?.amount || 0,
      paidRub: item.amount,
    }));
  }
}
