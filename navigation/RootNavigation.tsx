import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/types/types'; // Importe a tipagem

import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>(); // Use a tipagem aqui

const RootNavigator = () => {
return (
    <Stack.Navigator initialRouteName="MainApp" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />   
    <Stack.Screen name="MainApp" component={BottomTabNavigator} />
    </Stack.Navigator>
);
};

export default RootNavigator;