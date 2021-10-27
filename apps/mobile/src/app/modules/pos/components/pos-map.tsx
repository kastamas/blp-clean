import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { PosMapOverlay } from './pos-map-overlay';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useAppSelector } from '../../../store/hooks';
import { PosResponseDto } from '@business-loyalty-program/types';
import { PosModal } from './pos-modal';

const Wrapper = styled.View`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const StyledMap = styled(MapView)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const PosMap: React.FC = () => {
  const location = useAppSelector((state) => state.location.data);
  const [selectedPos, setSelectedPos] = useState<PosResponseDto | null>(null);
  const [isModalVisible, setModalVisibility] = useState(false);
  const pos = useAppSelector((state) => state.pos.data.filtered);

  return location ? (
    <>
      <StyledMap
        showsIndoors={false}
        showsBuildings={true}
        showsIndoorLevelPicker={false}
        showsTraffic={false}
        showsUserLocation={true}
        showsPointsOfInterest={false}
        provider={PROVIDER_GOOGLE}
        initialRegion={location}
      >
        {pos.map((item) => (
          <Marker
            key={item.id}
            onPress={() => setSelectedPos(item)}
            opacity={selectedPos && selectedPos.id === item.id ? 1 : 0.7}
            coordinate={{
              latitude: item.coords[0],
              longitude: item.coords[1],
            }}
            pinColor="red"
          />
        ))}
      </StyledMap>
      {selectedPos ? (
        <PosMapOverlay
          onSlideUp={() => setModalVisibility(true)}
          onClose={() => setSelectedPos(null)}
          pos={selectedPos}
        />
      ) : null}
      <PosModal
        pos={selectedPos}
        visible={isModalVisible}
        onClose={() => setModalVisibility(false)}
      />
    </>
  ) : (
    <Wrapper>
      <ActivityIndicator color="#2f8dfe" size="large" />
    </Wrapper>
  );
};
