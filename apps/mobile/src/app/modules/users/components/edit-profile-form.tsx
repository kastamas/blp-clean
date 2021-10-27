import React, { useState } from 'react';
import styled from 'styled-components/native';
import { PrimaryInput } from '../../../common/components/form-controls/primary-input';
import { Controller, useForm } from 'react-hook-form';
import { UsersMobileResponseDto } from '@business-loyalty-program/types';
import { PrimaryButton } from '../../../common/components/buttons/primary-button';
import { FakeInput } from '../../../common/components/data-display/fake-input';
import { DatePicker } from '../../../common/components/form-controls/date-picker';
import { SelectPicker } from '../../../common/components/form-controls/select-picker';
import { Picker } from '@react-native-picker/picker';
import { EUserSex } from '@business-loyalty-program/enums';
import { UsersApiService } from '../users-api.service';

const Wrapper = styled.View``;

const StyledPrimaryInput = styled(PrimaryInput)`
  margin-bottom: 12px;
`;

const StyledFakeInput = styled(FakeInput)`
  margin-bottom: 12px;
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  margin-top: 8px;
`;

const ColumnsWrapper = styled.View`
  display: flex;
  margin-bottom: 12px;
  flex-direction: row;
`;

const Spacing = styled.View`
  width: 8px;
`;

interface IComponentProps {
  user: UsersMobileResponseDto;
  onSubmit(data: any): void;
}

export const EditProfileForm: React.FC<IComponentProps> = ({
  user,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Wrapper>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledPrimaryInput
            label="Имя"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="name"
        defaultValue={user.name}
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <StyledPrimaryInput
            label="Фамилия"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="surname"
        defaultValue={user.surname}
      />

      <ColumnsWrapper>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              label="Дата рождения"
              onChange={onChange}
              value={value}
              disabled={!!user.dateOfBirth}
            />
          )}
          name="dateOfBirth"
          defaultValue={user.dateOfBirth}
        />
        <Spacing />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectPicker value={value} onChange={onChange} label="Пол">
              <Picker.Item label="Женский" value={EUserSex.Female} />
              <Picker.Item label="Мужской" value={EUserSex.Male} />
              <Picker.Item label="Не выбран" value={null} />
            </SelectPicker>
          )}
          name="sex"
          defaultValue={user.sex}
        />
      </ColumnsWrapper>

      {user.phone ? (
        <StyledFakeInput label="Телефон">{user.phone}</StyledFakeInput>
      ) : null}

      {user.email ? (
        <StyledFakeInput label="Email">{user.email}</StyledFakeInput>
      ) : null}

      {user.cardNumber ? (
        <StyledFakeInput label="Номер бонусной карты">
          {user.cardNumber}
        </StyledFakeInput>
      ) : null}

      <StyledPrimaryButton onPress={handleSubmit(onSubmit)}>
        Сохранить
      </StyledPrimaryButton>
    </Wrapper>
  );
};
