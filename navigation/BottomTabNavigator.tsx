// navigation/BottomTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../src/constants/theme';
import { useAuth } from '../context/AuthContext';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomePage from '../screens/Home';
import Favorites from '../screens/Favorites';
import AddItem from '../screens/Item/AddItem';
import Chat from '../screens/Chat/ChatList';
import ProfileLoggedIn from '../screens/Profile/ProfileLoggedIn';
import ProfileNotLoggedIn from '../screens/Profile/ProfileNotLoggedIn';

import { BottomTabParamList, PublicStackParamList } from '../src/types/navigation';

// Tipagem da navegação: Tab + Stack público (para ir até Login/Register quando não logado)
type Nav = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList>,
  NativeStackNavigationProp<PublicStackParamList>
>;

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  const { bottom } = useSafeAreaInsets();
  const { user } = useAuth();
  const navigation = useNavigation<Nav>();

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
          tabPress: (e) => {
            if (!user) {
              e.preventDefault();
              navigation.navigate('Login'); // está no PublicStack
            }
          },
        })}
      />

      <Tab.Screen
        name="Adicionar"
        component={AddItem}
        listeners={() => ({
          tabPress: (e) => {
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
          tabPress: (e) => {
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
          tabPress: (e) => {
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
