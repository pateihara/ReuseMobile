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
ProfileLoggedIn: undefined;
ForgotPassword: undefined;
Item: undefined
Chat: undefined
Profile: undefined;
AddItem: undefined;
Favorites: undefined;
Notifications: undefined;
MainApp: NavigatorScreenParams<BottomTabParamList>;
};