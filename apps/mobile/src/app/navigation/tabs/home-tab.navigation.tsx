import React from 'react';
import { EApplicationScreens } from '../../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../screens/home.screen';

const Stack = createStackNavigator();

export const HomeTabNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={EApplicationScreens.Home}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};
