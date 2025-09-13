import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/types'; // Importe a tipagem

// Tipar o hook useNavigation para entender as rotas
type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

const Register = () => {
const navigation = useNavigation<LoginScreenNavigationProp>();

const handleLogin = () => {
    // Lógica de autenticação
    // ...

    // Agora o TypeScript sabe que "MainApp" é uma rota válida
    navigation.navigate('MainApp', { screen: 'Home' });
};

return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Tela de Login</Text>
    <Button title="Entrar" onPress={handleLogin} />
    </View>
);
};

export default Register;