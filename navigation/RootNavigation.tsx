import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/types/types'; // Importe a tipagem

import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import BottomTabNavigator from './BottomTabNavigator';
import ProfileNotLoggedInScreen from '../screens/Auth/ProfileNotLoggedInScreen';
import Chat from '../screens/Chat';
import Item from '../screens/Item';
import ProfileLoggedInScreen from '../screens/Auth/ProfileLoggedInScreen';
import AddItem from '../screens/AddItem';
import Favorites from '../screens/Favorites';
import Notifications from '../screens/Notifications';

const Stack = createNativeStackNavigator<RootStackParamList>(); // Use a tipagem aqui

const RootNavigator = () => {
return (
    <Stack.Navigator initialRouteName="MainApp" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />   
    <Stack.Screen name="MainApp" component={BottomTabNavigator} />
    <Stack.Screen name="ProfileNotLoggedIn" component={ProfileNotLoggedInScreen} />
    <Stack.Screen name="Item" component={Item} />
    <Stack.Screen name="ProfileLoggedIn" component={ProfileLoggedInScreen} />
    <Stack.Screen name="AddItem" component={AddItem} />
    <Stack.Screen name="Favorites" component={Favorites} />
    <Stack.Screen name="Notifications" component={Notifications} />
    <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
);
};

export default RootNavigator;