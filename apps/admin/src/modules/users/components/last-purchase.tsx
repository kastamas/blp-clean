import * as React from 'react';
import styled from 'styled-components';
import { palette } from '@business-loyalty-program/ui-kit';
import { DateTime } from 'luxon';

export const Wrapper = styled.p`
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: left;

  color: ${palette.textSecondary};
`;

interface IComponentProps {
  purchaseDate?: string;
}

export const LastPurchase: React.FC<IComponentProps> = ({ purchaseDate }) => {
  return (
    <>
      {purchaseDate ? (
        <Wrapper>
          Последняя покупка:{' '}
          {DateTime.fromISO(purchaseDate).toLocaleString({ locale: 'ru' })}
        </Wrapper>
      ) : null}
    </>
  );
};
