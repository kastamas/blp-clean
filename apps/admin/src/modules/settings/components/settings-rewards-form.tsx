import * as React from 'react';
import styled from 'styled-components';
import {
  ButtonText,
  palette,
  PrimaryButtonBig,
  StyledForm,
  StyledInput,
  StyledInputNumber,
} from '@business-loyalty-program/ui-kit';
import { Form, Switch } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useGetCompanySettings, usePutCompanySettings } from '../settings.api';
import { CurrentCompanyContext } from '../../companies/current-company.context';
import { useForm } from 'antd/lib/form/Form';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const SwitchWrapper = styled.div`
  margin-right: 12px;
`;

const SwitchSettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
`;

const SettingLabel = styled(ButtonText)`
  text-align: left;
  margin-top: 6px;
  margin-bottom: 4px;
`;

const SettingInfo = styled.p`
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: left;
  color: ${palette.textSecondary};
  margin-bottom: 20px;
`;

interface IComponentProps {}

export const SettingsRewardsForm: React.FC<IComponentProps> = () => {
  const { company } = useContext(CurrentCompanyContext);
  const [form] = useForm();

  const {
    isLoading: isSettingsLoading,
    response: settings,
    apiAction: getSettings,
  } = useGetCompanySettings();

  const {
    isLoading: isSettingsUpdateLoading,
    apiAction: putSettings,
  } = usePutCompanySettings();

  useEffect(() => {
    getSettings(company.id);
  }, []);

  // const [isSwitchEnabled, setIsSwitchEnabled] = useState();

  // const handleSwitchChange = (newVal) => {
  // console.log(newVal);
  // setIsSwitchEnabled(newVal);
  // };

  const handleSubmit = (values) => {
    putSettings(company.id, values);
  };

  return (
    <>
      {settings ? (
        <StyledForm
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          initialValues={settings}
        >
          <Wrapper>
            <SwitchWrapper>
              <Form.Item name="initialBonusEnabled" valuePropName={'checked'}>
                <Switch />
              </Form.Item>
            </SwitchWrapper>

            <SwitchSettingsWrapper>
              <SettingLabel>Приветственные баллы</SettingLabel>
              <SettingInfo>
                Единоразовое начисление баллов клиенту за присоединение к
                компании
              </SettingInfo>

              <Form.Item shouldUpdate>
                {() => {
                  return (
                    <>
                      {form.getFieldValue('initialBonusEnabled') ? (
                        <Form.Item
                          label="Размер вознаграждения"
                          name="initialBonus"
                        >
                          <StyledInputNumber min={1} />
                        </Form.Item>
                      ) : null}
                    </>
                  );
                }}
              </Form.Item>
            </SwitchSettingsWrapper>
          </Wrapper>

          <Form.Item noStyle>
            <PrimaryButtonBig disabled={isSettingsUpdateLoading}>
              Сохранить
            </PrimaryButtonBig>
          </Form.Item>
        </StyledForm>
      ) : null}
    </>
  );
};
