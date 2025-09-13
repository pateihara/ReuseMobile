import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

import HomePage from '../screens/HomePage';
import Favorites from '../screens/Favorites';
import AddItem from '../screens/AddItem';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
return (
    <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
        } else if (route.name === 'AddItem') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
        } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
        } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
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
    <Tab.Screen name="AddItem" component={AddItem} options={{ title: 'Adicionar' }} />
    <Tab.Screen name="Chat" component={Chat} options={{ title: 'Chat' }} />
    <Tab.Screen name="Profile" component={Profile} options={{ title: 'Perfil' }} />
    </Tab.Navigator>
);
};

export default BottomTabNavigator;