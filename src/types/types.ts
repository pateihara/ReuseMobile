import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamList = {
  Início: undefined;
  Favoritos: undefined;
  Item: undefined;
  Chat: undefined;
  Perfil: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined; 
  ProfileNotLoggedIn: undefined;
  ProfileLoggedIn: undefined;
  ForgotPassword: undefined;
  Item: { id: any }; 
  Chat: undefined;
  Profile: undefined;
  AddItem: undefined;
  Favorites: undefined;
  Notifications: undefined;
  FeedbackAddItem: { item: any };
  Avaliation: undefined;
  Conversation: { chatId: string };
  MainApp: NavigatorScreenParams<BottomTabParamList>;
};
