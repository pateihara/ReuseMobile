import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamList = {
  Home: undefined;
  Favorites: undefined;
  AddItem: undefined;
  Chat: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined; 
  ProfileNotLoggedIn: undefined;
  ForgotPassword: undefined;
  MainApp: NavigatorScreenParams<BottomTabParamList>;
};
