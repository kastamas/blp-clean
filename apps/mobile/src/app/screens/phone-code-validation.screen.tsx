import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { PrimaryButton } from '../common/components/buttons/primary-button';
import { SecondaryButton } from '../common/components/buttons/secondary-button';
import { PrimaryInput } from '../common/components/form-controls/primary-input';
import { TScreenProps } from '../navigation/types';
import { EApplicationScreens } from '../screens';
import { PublicNavigationWrapper } from '../common/components/wrappers/public-navigation.wrapper';
import parsePhoneNumber from 'libphonenumber-js';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { codeCheckActions } from '../modules/auth/code-check.branch';
import {
  CODE_SENT_TIMEOUT,
  ResendCode,
} from '../modules/auth/components/resend-code';
import { authActions } from '../modules/auth/auth.branch';

const StyledPrimaryButton = styled(PrimaryButton)`
  margin-top: 24px;
  margin-bottom: 12px;
`;

const StyledPrimaryInput = styled(PrimaryInput)`
  margin-bottom: 12px;
`;

const Message = styled.Text`
  margin-top: 16px;
  text-align: center;
  color: #051c3f;
  font-size: 14px;
  margin-bottom: 24px;
`;

export const PhoneCodeValidationScreen: React.FC<
  TScreenProps<EApplicationScreens.PhoneCodeValidation>
> = ({ route, navigation }) => {
  const phone = route.params?.phone;
  const [formattedPhone, setFormattedPhone] = useState<string | null>(null);
  const lastSentDate = useAppSelector((state) => state.codeCheck.data);
  const user = useAppSelector((state) => state.auth.data.user);
  const [code, setCode] = useState<string>('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && user.phone) {
      navigation.navigate(EApplicationScreens.Profile);
    }
  }, [user]);

  useEffect(() => {
    if (!phone) {
      navigation.navigate(EApplicationScreens.PhoneSignIn);
    } else {
      const currentTime = new Date().getTime();
      if (!lastSentDate || currentTime - lastSentDate > CODE_SENT_TIMEOUT) {
        dispatch(codeCheckActions.createCode(phone));
      }
      const parsedNumber = parsePhoneNumber(phone, 'RU');
      setFormattedPhone(parsedNumber.formatInternational());
    }
  }, [phone]);

  return (
    <PublicNavigationWrapper title="Вход">
      <Message>
        Введите код из СМС. Мы отправили его {'\n'} на номер {formattedPhone}
      </Message>
      <StyledPrimaryInput
        value={code}
        onChangeText={setCode}
        placeholder="Код"
        keyboardType="numeric"
      />
      <ResendCode phone={phone} />
      <StyledPrimaryButton
        disabled={code.length !== 6}
        onPress={() => dispatch(authActions.singInCode({ phone, code }))}
      >
        Подтвердить
      </StyledPrimaryButton>
      <SecondaryButton onPress={() => navigation.goBack()}>
        Вернуться назад
      </SecondaryButton>
    </PublicNavigationWrapper>
  );
};
