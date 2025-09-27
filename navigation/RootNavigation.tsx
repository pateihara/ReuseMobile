import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../src/constants/theme';
import { useAuth } from '../context/AuthContext';

// Telas de Autenticação
import Login from '../screens/Auth/Login/index';
import Register from '../screens/Auth/Register/index';
import ForgotPassword from '../screens/Auth/ForgotPassword/index';

// Telas do Aplicativo Principal (com Abas)
import BottomTabNavigator from './BottomTabNavigator';
import Item from '../screens/Item/ItemScreen/index';
import Notifications from '../screens/Notifications/index';
import Chat from '../screens/Chat/ChatList/index';
import AddItem from '../screens/Item/AddItem/index';
import Favorites from '../screens/Favorites/index';
import ProfileLoggedIn from '../screens/Profile/ProfileLoggedIn/index';
import UserReview from '../screens/UserReview/Review/index';
import FeedbackAddItem from '../screens/Item/FeedbackAddItem/index';
import Conversation from '../screens/Chat/Conversation/index';
import FeedbackUserReview from '../screens/UserReview/FeedbackUserReview/index'
import TradesScreen from '../screens/TradesScreen';
import Desenvolvimento from '../screens/Desenvolvimento';

const Stack: any = createNativeStackNavigator();

// 1. Pilha para usuários logados
const AppStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="ProfileLoggedIn" component={ProfileLoggedIn} />
        <Stack.Screen name="FeedbackAddItem" component={FeedbackAddItem} />
        <Stack.Screen name="Item" component={Item} />
        <Stack.Screen name="UserReview" component={UserReview} />
        <Stack.Screen name="Conversation" component={Conversation} />
        <Stack.Screen name="FeedbackUserReview" component={FeedbackUserReview} />
        <Stack.Screen name="TradesScreen" component={TradesScreen} />
        <Stack.Screen name="Desenvolvimento" component={Desenvolvimento} />
    </Stack.Navigator>
);

// 2. Pilha para usuários não logados, que podem navegar na home e em outras telas públicas
const PublicStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* A BottomTabNavigator como a primeira tela */}
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        {/* Adicione outras telas que podem ser acessadas sem login aqui, se necessário */}
        <Stack.Screen name="Item" component={Item} />
    </Stack.Navigator>
);

const RootNavigator = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                // ✅ Se o usuário estiver logado, mostre o App Stack
                <Stack.Screen name="LoggedInFlow" component={AppStack} />
            ) : (
                // 🔒 Se o usuário não estiver logado, mostre o Public Stack
                <Stack.Screen name="PublicFlow" component={PublicStack} />
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;