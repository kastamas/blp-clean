import React from 'react';
import { EApplicationScreens } from '../screens';
import { AuthScreen } from '../screens/auth.screen';
import { createStackNavigator } from '@react-navigation/stack';
import { PhoneSignInScreen } from '../screens/phone-sign-in.screen';
import { PhoneCodeValidationScreen } from '../screens/phone-code-validation.screen';

const Stack = createStackNavigator();

export const PublicNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={EApplicationScreens.Auth}
        component={AuthScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={EApplicationScreens.PhoneSignIn}
        component={PhoneSignInScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name={EApplicationScreens.PhoneCodeValidation}
        component={PhoneCodeValidationScreen}
      />
    </Stack.Navigator>
  );
};
