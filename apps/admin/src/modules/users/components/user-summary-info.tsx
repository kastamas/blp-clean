import * as React from 'react';
import styled from 'styled-components';
import { buttonTextMixin, palette } from '@business-loyalty-program/ui-kit';
import { UsersResponseDto } from '@business-loyalty-program/types';

const Wrapper = styled.div`
  display: flex;
`;

const Item = styled.div`
  padding-right: 12px;
  min-width: 160px;
  padding-left: 12px;
  border-left: 1px solid ${palette.elements};
`;

const Title = styled.div`
  color: ${palette.textSecondary};
  margin-bottom: 8px;
  text-align: left;
`;

const Value = styled.div`
  ${buttonTextMixin};
  text-align: left;
`;

interface IComponentProps {
  user: UsersResponseDto;
  className?: string;
}

export const UserSummaryInfo: React.FC<IComponentProps> = ({
  user,
  className,
}) => {
  const { paidRub, paidBonuses, bonusAmount } = user;

  const summaryValues = [
    {
      title: 'Оплачено рублями',
      value: paidRub,
    },
    {
      title: 'Оплачено баллами',
      value: paidBonuses,
    },
    {
      title: 'Остаток баллов',
      value: bonusAmount,
    },
  ];

  return (
    <Wrapper className={className}>
      {summaryValues.map((item, index) => (
        <Item key={index}>
          <Title>{item.title}</Title>
          <Value>{item.value}</Value>
        </Item>
      ))}
    </Wrapper>
  );
};
