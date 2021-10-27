import React from 'react';
import { EApplicationScreens } from '../../screens';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../../screens/profile.screen';
import { PhoneSignInScreen } from '../../screens/phone-sign-in.screen';
import { PhoneCodeValidationScreen } from '../../screens/phone-code-validation.screen';
import { EditProfileScreen } from '../../screens/edit-profile.screen';

const Stack = createStackNavigator();

export const ProfileTabNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name={EApplicationScreens.Profile}
        component={ProfileScreen}
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
      <Stack.Screen
        options={{
          title: 'Редактироавние профиля',
          headerStyle: {
            backgroundColor: '#F3F4F8',
          },
        }}
        name={EApplicationScreens.EditProfile}
        component={EditProfileScreen}
      />
    </Stack.Navigator>
  );
};
