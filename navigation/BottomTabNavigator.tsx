import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../src/constants/theme';
import { useAuth } from '../context/AuthContext';

import HomePage from '../screens/HomePage';
import Favorites from '../screens/Favorites';
import AddItem from '../screens/AddItem';
import Chat from '../screens/Chat';
import ProfileLoggedInScreen from '../screens/Auth/ProfileLoggedInScreen';
import ProfileNotLoggedInScreen from '../screens/Auth/ProfileNotLoggedInScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    const { user } = useAuth();

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string | undefined;
                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Favorites':
                            iconName = focused ? 'heart' : 'heart-outline';
                            break;
                        case 'AddItem':
                            iconName = focused ? 'add-circle' : 'add-circle-outline';
                            break;
                        case 'Chat':
                            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                            break;
                        case 'Profile':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                    }
                    return iconName ? <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} /> : null;
                },
                tabBarActiveTintColor: Colors.light.primary,
                tabBarInactiveTintColor: Colors.light.textSecondary,
                tabBarStyle: {
                    backgroundColor: Colors.light.backgroundSecondary,
                    borderTopColor: Colors.light.border,
                    height: 60,
                    paddingBottom: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
            })}
        >
            <Tab.Screen name="Home" component={HomePage} options={{ title: 'Início' }} />
            <Tab.Screen name="Favorites" component={Favorites} options={{ title: 'Favoritos' }} />
            <Tab.Screen name="AddItem" component={AddItem} options={{ title: 'Item' }} />
            <Tab.Screen name="Chat" component={Chat} options={{ title: 'Chat' }} />
            <Tab.Screen 
                name="Profile" 
                component={user ? ProfileLoggedInScreen : ProfileNotLoggedInScreen} 
                options={{ title: 'Perfil' }} 
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
