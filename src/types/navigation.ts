// src/types/navigation.ts
import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamList = {
  'Início': undefined;
  'Favoritos': undefined;
  'Adicionar': undefined;
  'Chat': undefined;
  'Perfil': undefined;
};

export type AppStackParamList = {
 MainApp: NavigatorScreenParams<BottomTabParamList>;
  Chat: undefined;
  AddItem: undefined;
  Favorites: undefined;
  Notifications: undefined;
  ProfileLoggedIn: undefined;
  FeedbackAddItem: { item?: any } | undefined;
  Item: { id?: string } | undefined;  UserReview: { userId?: string } | undefined;
  Conversation: { chatId?: string } | undefined;
  FeedbackUserReview: undefined;
  TradesScreen: undefined;
  Desenvolvimento: undefined;
  
};

export type PublicStackParamList = {
  MainApp: NavigatorScreenParams<BottomTabParamList>;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Item: { id?: string } | undefined;
};

export type RootStackParamList = {
  LoggedInFlow: undefined;
  PublicFlow: undefined;
};
