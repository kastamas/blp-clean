import React from 'react';
import { EApplicationScreens } from '../../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { AddressesScreen } from '../../screens/addresses.screen';

const Stack = createStackNavigator();

export const AddressesTabNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ header: () => null }}
        name={EApplicationScreens.Addresses}
        component={AddressesScreen}
      />
    </Stack.Navigator>
  );
};
