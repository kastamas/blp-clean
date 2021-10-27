import { Injectable } from '@nestjs/common';
import {
  CompanyModel,
  PosRepository,
} from '@business-loyalty-program/database';

@Injectable()
export class PosService {
  constructor(private readonly posRepository: PosRepository) {}

  public getList(company: CompanyModel) {
    return this.posRepository.getList(
      { offset: 0, limit: 1000 },
      {
        company,
      }
    );
  }
}
