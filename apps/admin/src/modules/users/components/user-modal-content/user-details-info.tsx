import * as React from 'react';
import styled from 'styled-components';
import { Caption, palette, Subtitle1 } from '@business-loyalty-program/ui-kit';
import { DateTime } from 'luxon';
import { EUserSex } from '@business-loyalty-program/enums';
import { UsersResponseDto } from '@business-loyalty-program/types';
import { InfoColumn } from '../../../../common/data-display/info/info-column';

interface IComponentProps {
  user: UsersResponseDto;
  className?: string;
}

const UserStatisticsComponent: React.FC<IComponentProps> = ({
  user,
  className,
}) => {
  const { sex, dateOfBirth, email, phone, cardNumber } = user;

  const detailsValues = [
    {
      title: 'День рождения',
      value: dateOfBirth
        ? DateTime.fromISO(dateOfBirth).toLocaleString({ locale: 'ru' })
        : '-',
    },
    {
      title: 'Пол',
      value:
        sex === EUserSex.Male
          ? 'Мужской'
          : sex === EUserSex.Female
          ? 'Женский'
          : 'Не указан',
    },
    { title: 'Email', value: email },
    { title: 'Телефон', value: phone },
    { title: 'Номер карты', value: cardNumber },
  ];

  return <InfoColumn infoValues={detailsValues} className={className} />;
};

export const UserDetailsInfo = styled(UserStatisticsComponent)``;
