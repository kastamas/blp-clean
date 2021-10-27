import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { v4 } from 'uuid';
import { LinkButton } from '../../../common/components/buttons/link-button';
import { codeCheckActions } from '../code-check.branch';

const Wrapper = styled.View`
  display: flex;
  width: 100%;
`;

const Message = styled.Text`
  color: #051c3f;
  font-size: 14px;
`;

const StyledLinkButton = styled(LinkButton)`
  justify-content: flex-start;
`;

export const CODE_SENT_TIMEOUT = 60 * 1000;

interface IComponentProps {
  phone: string;
}

export const ResendCode: React.FC<IComponentProps> = ({ phone }) => {
  const lastSentDate = useAppSelector((state) => state.codeCheck.data);
  const isLoading = useAppSelector((state) => state.codeCheck.loading);
  const [updateHash, setUpdateHash] = useState(v4());

  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateHash(v4());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function isPending() {
    return new Date().getTime() - lastSentDate < CODE_SENT_TIMEOUT;
  }

  function getRemainingTime() {
    const passedTime = new Date().getTime() - lastSentDate;
    const remainingTimeRow = CODE_SENT_TIMEOUT - passedTime;

    const remainingSeconds = (remainingTimeRow / 1000).toFixed();

    return remainingSeconds.length === 2
      ? remainingSeconds
      : `0${remainingSeconds}`;
  }

  return lastSentDate ? (
    <Wrapper key={updateHash}>
      {isPending() ? (
        <Message>Отправить код повторно через 00:{getRemainingTime()}</Message>
      ) : (
        <StyledLinkButton
          disabled={isLoading}
          onPress={() => dispatch(codeCheckActions.createCode(phone))}
        >
          Отправить код повторно
        </StyledLinkButton>
      )}
    </Wrapper>
  ) : null;
};
