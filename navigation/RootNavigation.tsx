import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/types/types';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../src/constants/theme';
import { useAuth } from '../context/AuthContext';

import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import BottomTabNavigator from './BottomTabNavigator';
import Item from '../screens/Item';
import Notifications from '../screens/Notifications';
import Chat from '../screens/Chat';
import AddItem from '../screens/AddItem';
import Favorites from '../screens/Favorites';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    const { isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* BottomTabNavigator é a tela principal */}
            <Stack.Screen name="MainApp" component={BottomTabNavigator} />

            {/* Telas que abrem via stack */}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="Item" component={Item} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="AddItem" component={AddItem} />
            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen name="Notifications" component={Notifications} />
        </Stack.Navigator>
    );
};

export default RootNavigator;
