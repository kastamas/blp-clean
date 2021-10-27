import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EApplicationScreens } from '../screens';

type RootStackParamList = {
  [EApplicationScreens.PhoneCodeValidation]: {
    phone: string;
  };
  [EApplicationScreens.Auth]: undefined;
  [EApplicationScreens.Home]: undefined;
  [EApplicationScreens.Profile]: undefined;
  [EApplicationScreens.Addresses]: undefined;
  [EApplicationScreens.Pos]: undefined;
  [EApplicationScreens.PhoneSignIn]: undefined;
  [EApplicationScreens.EditProfile]: undefined;
};

export type TScreenProps<Route extends EApplicationScreens> = {
  route: RouteProp<RootStackParamList, Route>;
  navigation: StackNavigationProp<RootStackParamList, Route>;
};
