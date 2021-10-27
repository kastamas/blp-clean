import { Injectable } from '@nestjs/common';
import {
  CompanyModel,
  PosModel,
  PosRepository,
} from '@business-loyalty-program/database';
import {
  NewPosDto,
  PosCollectionQueryDto,
  PosUpdateDto,
} from '@business-loyalty-program/types';

@Injectable()
export class PosService {
  constructor(private readonly posRepository: PosRepository) {}

  public create(body: NewPosDto, company: CompanyModel) {
    return this.posRepository.create({
      ...body,
      company,
    });
  }

  public getList(query: PosCollectionQueryDto, company: CompanyModel) {
    return this.posRepository.getList(query, {
      company,
    });
  }

  public update(entity: PosModel, body: PosUpdateDto) {
    return this.posRepository.update(entity, body);
  }
}
