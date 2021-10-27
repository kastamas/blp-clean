import * as React from 'react';
import styled from 'styled-components';
import { Caption, palette, Subtitle1 } from '@business-loyalty-program/ui-kit';
import { ReactNode } from 'react';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled(Caption)`
  color: ${palette.textSecondary};
  margin-bottom: 4px;
`;

const Value = styled(Subtitle1)`
  text-align: left;
  margin-bottom: 12px;
`;

interface IComponentProps {
  infoValues: { title: string; value?: number | string | ReactNode }[];
  className?: string;
}

export const InfoColumn: React.FC<IComponentProps> = ({
  infoValues,
  className,
}) => {
  return (
    <Wrapper className={className}>
      {infoValues.map((item, index) => (
        <div key={index}>
          <Title>{item.title}</Title>
          <Value>
            {item.value !== undefined && item.value !== null ? item.value : '—'}
          </Value>
        </div>
      ))}
    </Wrapper>
  );
};
