import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { posActions } from '../modules/pos/pos.branch';
import { SceneMap, TabView } from 'react-native-tab-view';
import { PosMap } from '../modules/pos/components/pos-map';
import { PosTabBar } from '../modules/pos/components/pos-tab-bar';
import { PosList } from '../modules/pos/components/pos-list';
import { PosSearch } from '../modules/pos/components/pos-search';
import { TScreenProps } from '../navigation/types';
import { EApplicationScreens } from '../screens';

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
`;

const TabsWrapper = styled.View`
  position: relative;
  height: 100%;
  width: 100%;
`;

const FirstRoute = () => (
  <View style={{ flex: 1 }}>
    <PosMap />
  </View>
);

const SecondRoute = () => (
  <ScrollView style={{ flex: 1 }}>
    <PosList />
  </ScrollView>
);

export const AddressesScreen: React.FC<
  TScreenProps<EApplicationScreens.Addresses>
> = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(posActions.getPosList());
  }, []);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'map', title: 'Карта' },
    { key: 'list', title: 'Список' },
  ]);

  const renderScene = SceneMap({
    map: FirstRoute,
    list: SecondRoute,
  });

  return (
    <Wrapper>
      {/*<PosSearch*/}
      {/*  onChange={(value) => dispatch(posActions.applyFilter(value))}*/}
      {/*/>*/}
      <TabsWrapper>
        <TabView
          renderTabBar={(props) => <PosTabBar {...props} />}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </TabsWrapper>
    </Wrapper>
  );
};
