// navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../src/constants/theme';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../src/types/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomePage from '../screens/Home';
import Favorites from '../screens/Favorites/index';
import AddItem from '../screens/Item/AddItem/index';
import Chat from '../screens/Chat/ChatList/index';
import ProfileLoggedIn from '../screens/Profile/ProfileLoggedIn/index';
import ProfileNotLoggedIn from '../screens/Profile/ProfileNotLoggedIn/index';
import { BottomTabParamList } from '../src/types/types';


const Tab : any = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
    const { bottom } = useSafeAreaInsets();
    const { user } = useAuth();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); 

    return (
        <Tab.Navigator
            initialRouteName="Início"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home';
                    switch (route.name) {
                        case 'Início':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Favoritos':
                            iconName = focused ? 'heart' : 'heart-outline';
                            break;
                        case 'Adicionar':
                            iconName = focused ? 'add-circle' : 'add-circle-outline';
                            break;
                        case 'Chat':
                            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                            break;
                        case 'Perfil':
                            iconName = focused ? 'person' : 'person-outline';
                            break;
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: Colors.light.primary,
                tabBarInactiveTintColor: Colors.light.textSecondary,
                tabBarStyle: {
                    backgroundColor: Colors.light.backgroundSecondary,
                    borderTopColor: Colors.light.border,
                    height: 60 + bottom,
        paddingBottom: bottom > 0 ? bottom : 5,
                },
                tabBarLabelStyle: { fontSize: 12 },
            })}
        >
            <Tab.Screen name="Início" component={HomePage} />
            
            <Tab.Screen 
                name="Favoritos" 
                component={Favorites} 
                listeners={() => ({
                    tabPress: e => {
                        if (!user) {
                            e.preventDefault();
                            navigation.navigate('Login');
                        }
                    },
                })}
            />
            <Tab.Screen 
                name="Adicionar" 
                component={AddItem}
                listeners={() => ({
                    tabPress: e => {
                        if (!user) {
                            e.preventDefault();
                            navigation.navigate('Login');
                        }
                    },
                })}
            />
            <Tab.Screen 
                name="Chat" 
                component={Chat}
                listeners={() => ({
                    tabPress: e => {
                        if (!user) {
                            e.preventDefault();
                            navigation.navigate('Login');
                        }
                    },
                })}
            />
            <Tab.Screen
                name="Perfil"
                component={user ? ProfileLoggedIn : ProfileNotLoggedIn}
                listeners={() => ({
                    tabPress: e => {
                        if (!user) {
                            e.preventDefault();
                            navigation.navigate('Login');
                        }
                    },
                })}
            />
        </Tab.Navigator>
    );
};


export default BottomTabNavigator;