import * as React from 'react';
import styled from 'styled-components';
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { TableActionIconWrapper } from './table-action-icon-wrapper';
import { BlpIcon } from '@business-loyalty-program/ui-kit';

interface IComponentProps {
  title: React.ReactNode;
  onConfirm?: (event?: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (event?: React.MouseEvent<HTMLElement>) => void;
}

export const TableActionDelete: React.FC<IComponentProps> = (props) => {
  const { title, onConfirm, onCancel } = props;

  return (
    <Popconfirm
      okText={'Удалить'}
      cancelText={'Отмена'}
      title={title}
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={(event) => {
        event.stopPropagation();

        if (onConfirm) {
          onConfirm(event);
        }
      }}
      onCancel={(event) => {
        event.stopPropagation();

        if (onCancel) {
          onCancel(event);
        }
      }}
    >
      <TableActionIconWrapper
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <BlpIcon iconName="delete" />
      </TableActionIconWrapper>
    </Popconfirm>
  );
};
