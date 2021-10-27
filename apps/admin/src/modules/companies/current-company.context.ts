import React from 'react';
import { CompaniesResponseDto } from '@business-loyalty-program/types';

export interface ICurrentCompanyContext {
  company: CompaniesResponseDto;
  setCompany(company: CompaniesResponseDto): void;
}

export const CurrentCompanyContext = React.createContext({
  company: undefined,
  setCompany: (company: CompaniesResponseDto) => {},
});
