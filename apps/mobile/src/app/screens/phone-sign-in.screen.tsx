import React, { useState } from 'react';
import styled from 'styled-components/native';
import { PrimaryButton } from '../common/components/buttons/primary-button';
import { SecondaryButton } from '../common/components/buttons/secondary-button';
import { PrimaryInput } from '../common/components/form-controls/primary-input';
import parsePhoneNumber from 'libphonenumber-js';
import { EApplicationScreens } from '../screens';
import { TScreenProps } from '../navigation/types';
import { PublicNavigationWrapper } from '../common/components/wrappers/public-navigation.wrapper';

const StyledPrimaryButton = styled(PrimaryButton)`
  margin-bottom: 12px;
`;

const StyledPrimaryInput = styled(PrimaryInput)`
  margin-top: 48px;
  margin-bottom: 12px;
`;

export const PhoneSignInScreen: React.FC<
  TScreenProps<EApplicationScreens.PhoneSignIn>
> = ({ navigation }) => {
  const [phone, setPhone] = useState<string>('+7');
  const [isValidNumber, setNumberValidity] = useState(false);

  function onTextChange(value: string) {
    if (value.length <= 1) {
      setPhone('+7');
      return;
    }

    const parsedNumber = parsePhoneNumber(value, 'RU');
    setNumberValidity(parsedNumber && parsedNumber.isValid());

    setPhone(value);
  }

  return (
    <PublicNavigationWrapper title="Вход">
      <StyledPrimaryInput
        value={phone}
        onChangeText={onTextChange}
        label="Телефон"
        keyboardType="phone-pad"
      />
      <StyledPrimaryButton
        disabled={!isValidNumber}
        onPress={() =>
          navigation.navigate(EApplicationScreens.PhoneCodeValidation, {
            phone,
          })
        }
      >
        Получить код
      </StyledPrimaryButton>
      <SecondaryButton onPress={() => navigation.goBack()}>
        Вернуться назад
      </SecondaryButton>
    </PublicNavigationWrapper>
  );
};
