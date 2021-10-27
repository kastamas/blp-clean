import * as React from 'react';
import styled from 'styled-components';
import { ModalTitle } from '@business-loyalty-program/ui-kit';
import { PosResponseDto } from '@business-loyalty-program/types';
import { useAddCompanyPOS, useEditPOS } from '../pos.api';
import { useContext, useEffect } from 'react';
import { CurrentCompanyContext } from '../../companies/current-company.context';
import { PosForm } from './pos-form';

const Wrapper = styled.div``;

interface IComponentProps {
  pos?: PosResponseDto;
  onSuccess(): void;
  onCancel(): void;
}

export const PosModalContent: React.FC<IComponentProps> = (props) => {
  const { company } = useContext(CurrentCompanyContext);
  const { onSuccess, pos, onCancel } = props;

  const {
    isLoading: isAddCompanyPosLoading,
    apiAction: addCompanyPos,
    response: addCompanyPosResponse,
  } = useAddCompanyPOS();

  const {
    isLoading: isEditPosLoading,
    apiAction: editPos,
    response: editPosResponse,
  } = useEditPOS();

  const isLoading = isAddCompanyPosLoading || isEditPosLoading;

  const editMode = !!pos;

  const handleSubmit = (values: any) => {
    const {
      address: { address, coords },
    } = values;

    if (editMode) {
      editPos(pos.id, { ...values, address, coords });
    } else {
      addCompanyPos(company.id, { ...values, address, coords });
    }
  };

  useEffect(() => {
    if (editPosResponse || addCompanyPosResponse) {
      onSuccess();
    }
  }, [editPosResponse, addCompanyPosResponse]);

  return (
    <Wrapper>
      <ModalTitle>
        {editMode
          ? 'Редактирование торговой точки'
          : 'Добавление торговой точки'}
      </ModalTitle>

      <PosForm
        initialValues={pos}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onCancel={onCancel}
      />
    </Wrapper>
  );
};
