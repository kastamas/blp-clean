import React, { useEffect } from 'react';
import { EApplicationScreens } from '../screens';
import { HomeTabNavigation } from './tabs/home-tab.navigation';
import { AddressesTabNavigation } from './tabs/addresses-tab.navigation';
import { ProfileTabNavigation } from './tabs/profile-tab.navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Platform, TouchableOpacity } from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { locationActions } from '../modules/location/location.branch';

const Tab = createBottomTabNavigator();

export const PrivateNavigation: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(locationActions.getLocation());
  }, []);

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: Platform.OS === 'ios' ? 90 : 60,
        },
        tabStyle: {
          marginBottom: 10,
        },
        keyboardHidesTabBar: true,
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case EApplicationScreens.Home:
              return (
                <Ionicons name="wallet-outline" size={size} color={color} />
              );
            case EApplicationScreens.Profile:
              return (
                <Ionicons name="person-outline" size={size} color={color} />
              );
            case EApplicationScreens.Addresses:
              return (
                <Ionicons
                  name="navigate-circle-outline"
                  size={size}
                  color={color}
                />
              );
          }
        },
        tabBarButton: (props) => <TouchableOpacity {...props} />,
      })}
    >
      <Tab.Screen
        options={{ title: 'Мои баллы' }}
        name={EApplicationScreens.Home}
        component={HomeTabNavigation}
      />
      <Tab.Screen
        options={{ title: 'Адреса' }}
        name={EApplicationScreens.Addresses}
        component={AddressesTabNavigation}
      />
      <Tab.Screen
        options={{ title: 'Профиль' }}
        name={EApplicationScreens.Profile}
        component={ProfileTabNavigation}
      />
    </Tab.Navigator>
  );
};
