import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../src/constants/theme';
import { useAuth } from '../context/AuthContext';

// Autenticação
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import ForgotPassword from '../screens/Auth/ForgotPassword';

// App
import BottomTabNavigator from './BottomTabNavigator';
import Item from '../screens/Item/ItemScreen';
import Notifications from '../screens/Notifications';
import Chat from '../screens/Chat/ChatList';
import AddItem from '../screens/Item/AddItem';
import Favorites from '../screens/Favorites';
import ProfileLoggedIn from '../screens/Profile/ProfileLoggedIn';
import UserReview from '../screens/UserReview/Review';
import FeedbackAddItem from '../screens/Item/FeedbackAddItem';
import Conversation from '../screens/Chat/Conversation';
import FeedbackUserReview from '../screens/UserReview/FeedbackUserReview';
import TradesScreen from '../screens/TradesScreen';
import Desenvolvimento from '../screens/Desenvolvimento';

import {
  RootStackParamList,
  AppStackParamList,
  PublicStackParamList,
} from '../src/types/navigation';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();
const PublicStack = createNativeStackNavigator<PublicStackParamList>();

const AppStackNavigator = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="MainApp" component={BottomTabNavigator} />
    <AppStack.Screen name="Chat" component={Chat} />
    <AppStack.Screen name="AddItem" component={AddItem} />
    <AppStack.Screen name="Favorites" component={Favorites} />
    <AppStack.Screen name="Notifications" component={Notifications} />
    <AppStack.Screen name="ProfileLoggedIn" component={ProfileLoggedIn} />
    <AppStack.Screen name="FeedbackAddItem" component={FeedbackAddItem} />
    <AppStack.Screen name="Item" component={Item} />
    <AppStack.Screen name="UserReview" component={UserReview} />
    <AppStack.Screen name="Conversation" component={Conversation} />
    <AppStack.Screen name="FeedbackUserReview" component={FeedbackUserReview} />
    <AppStack.Screen name="TradesScreen" component={TradesScreen} />
    <AppStack.Screen name="Desenvolvimento" component={Desenvolvimento} />
  </AppStack.Navigator>
);

const PublicStackNavigator = () => (
  <PublicStack.Navigator screenOptions={{ headerShown: false }}>
    <PublicStack.Screen name="MainApp" component={BottomTabNavigator} />
    <PublicStack.Screen name="Login" component={Login} />
    <PublicStack.Screen name="Register" component={Register} />
    <PublicStack.Screen name="ForgotPassword" component={ForgotPassword} />
    <PublicStack.Screen name="Item" component={Item} />
  </PublicStack.Navigator>
);

const RootNavigator = () => {
  const { user, loading: isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <RootStack.Screen name="LoggedInFlow" component={AppStackNavigator} />
      ) : (
        <RootStack.Screen name="PublicFlow" component={PublicStackNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
