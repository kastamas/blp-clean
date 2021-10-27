import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import styled from 'styled-components/native';
import { PosImage } from '../../../common/components/pos-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PosModal } from './pos-modal';
import { PosResponseDto } from '@business-loyalty-program/types';
import { RefreshControl, TouchableHighlight } from 'react-native';
import { posActions } from '../pos.branch';

const Wrapper = styled.ScrollView`
  padding: 28px 16px;
`;

const ListItem = styled.View`
  padding: 16px 0;
  display: flex;
  flex-direction: row;
  border-bottom-color: #dae0ed;
  border-bottom-width: 1px;
`;

const InfoWrapper = styled.View`
  margin-left: 12px;
  flex: 1;
`;

const Title = styled.Text`
  color: #051c3f;
  font-size: 14px;
  line-height: 16px;
  font-family: 'Roboto-Medium';
  margin-bottom: 4px;
`;

const Address = styled.Text`
  font-size: 12px;
  line-height: 14px;
  color: #051c3f;
  font-family: 'Roboto-Regular';
`;

const ChevronWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PosList: React.FC = () => {
  const { items, loading } = useAppSelector((state) => ({
    items: state.pos.data.filtered,
    loading: state.pos.loading,
  }));
  const [selectedPos, setSelectedPos] = useState<PosResponseDto | null>(null);
  const dispatch = useAppDispatch();

  return (
    <>
      <Wrapper
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => dispatch(posActions.getPosList())}
          />
        }
      >
        {items.map((item) => (
          <TouchableHighlight
            key={item.id}
            activeOpacity={0.9}
            underlayColor="#F3F4F8"
            onPress={() => setSelectedPos(item)}
          >
            <ListItem>
              <PosImage
                source={require('../../../../assets/images/poi-placeholder.png')}
              />
              <InfoWrapper>
                <Title>{item.name}</Title>
                <Address>{item.address}</Address>
              </InfoWrapper>
              <ChevronWrapper>
                <Ionicons
                  name="chevron-forward-outline"
                  size={22}
                  color="#858EA3"
                />
              </ChevronWrapper>
            </ListItem>
          </TouchableHighlight>
        ))}
      </Wrapper>
      <PosModal
        pos={selectedPos}
        visible={!!selectedPos}
        onClose={() => setSelectedPos(null)}
      />
    </>
  );
};
