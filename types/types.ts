import { NavigatorScreenParams } from '@react-navigation/native';

// Tipagem para as telas do seu Bottom Tab Navigator
export type BottomTabParamList = {
  Home: undefined;
  Favorites: undefined;
  AddItem: undefined;
  Chat: undefined;
  Profile: undefined;
};

// Tipagem para o seu Stack Navigator
export type RootStackParamList = {
  Login: undefined;
  MainApp: NavigatorScreenParams<BottomTabParamList>;
};