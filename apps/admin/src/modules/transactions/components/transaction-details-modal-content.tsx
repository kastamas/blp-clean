import * as React from 'react';
import styled from 'styled-components';
import { MenuText, ModalTitle } from '@business-loyalty-program/ui-kit';
import { InfoColumn } from '../../../common/data-display/info/info-column';
import { TransactionResponseDto } from '@business-loyalty-program/types';
import { DateTime } from 'luxon';
import { DisplayUserName } from '../../users/components/display-user-name';
import { routes } from '../../../routes';
import { InlineLinkInternal } from '../../../common/data-display/link/inline-link-internal';
import { DisplayPhoneNumber } from '../../../common/data-display/display/display-phone-number';

const Wrapper = styled.div``;

const Subtitle = styled(MenuText)`
  margin-bottom: 16px;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;

interface IComponentProps {
  transaction: TransactionResponseDto;
}

export const TransactionDetailsModalContent: React.FC<IComponentProps> = ({
  transaction,
}) => {
  const {
    id,
    bonusTransaction,
    createdAt,
    pos,
    amount,
    user,
    description,
    externalId,
  } = transaction;

  const transactionInfoValues = [
    {
      title: 'Дата',
      value: (
        <>
          {DateTime.fromISO(createdAt).toLocaleString({ locale: 'ru' })}
          &nbsp;
          {DateTime.fromISO(createdAt).toFormat('HH:mm')}
          &nbsp; ({DateTime.fromISO(createdAt).toRelative({ locale: 'ru' })})
        </>
      ),
    },
    {
      title: 'Начислено/списано баллов',
      value: `${bonusTransaction?.amount || '—'}`,
    },
    { title: 'Оплачено, Рубли', value: `${amount} ₽` },
    { title: 'Описание (от торговой точки)', value: description },
    { title: 'ID', value: id },
    { title: 'Внешний ID', value: externalId },
  ];

  const clientInfoValues = [
    {
      title: 'Клиент',
      value: (
        <InlineLinkInternal href={routes.client(user.id)}>
          <DisplayUserName user={user} />
        </InlineLinkInternal>
      ),
    },
    {
      title: 'Телефон',
      value: <DisplayPhoneNumber phone={user.phone} withLink={true} />,
    },
    {
      title: 'Дата рождения',
      valuer: user.dateOfBirth,
    },
    {
      title: 'ID',
      value: user.id,
    },
  ];

  const posInfoValues = [
    {
      title: 'Название',
      value: pos.name,
    },
    {
      title: 'Адрес',
      value: pos.address,
    },
    {
      title: 'Примечание',
      value: pos.note,
    },
    {
      title: 'Телефон',
      value: <DisplayPhoneNumber phone={pos.phone} withLink={true} />,
    },
    { title: 'ID', value: pos.id },
    { title: 'Внешний ID', value: pos.externalId },
  ];

  return (
    <Wrapper>
      <ModalTitle>Детали операции</ModalTitle>

      <DetailsGrid>
        <div>
          <Subtitle>Операция</Subtitle>
          <InfoColumn infoValues={transactionInfoValues} />
        </div>
        <div>
          <Subtitle>Клиент</Subtitle>
          <InfoColumn infoValues={clientInfoValues} />
        </div>
        <div>
          <Subtitle>Торговая точка</Subtitle>
          <InfoColumn infoValues={posInfoValues} />
        </div>
      </DetailsGrid>
    </Wrapper>
  );
};
