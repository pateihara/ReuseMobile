import React, { useState } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../src/types/RootStackParamList';
import Button from '../../../src/components/Button/index';
import Card from '../../../src/components/Cards/Card/index';
import Header from '../../../src/components/Header/index';
import { useAuth } from '../../../context/AuthContext';
import { styles } from './styles';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const error = await login(email, password);

        if (error) {
            Alert.alert("Erro de login", error);
            return;
        }
    };

    const handleLoginWithGoogle = () => {
        // Lógica de login com Google
    };

    const handleLoginWithFacebook = () => {
        // Lógica de login com Facebook
    };

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };

    const handleGoToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <ImageBackground
            source={require('../../../src/assets/background.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Header type="logo" />
                <View style={styles.content}>
                    <Card style={styles.card}>
                        <Text style={styles.title}>Bem-vindo de volta!</Text>
                        <Text style={styles.text}>Faça login para continuar</Text>

                        {/* Inputs */}
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            placeholder="Senha"
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            secureTextEntry
                        />

                        {/* Botão Entrar (Primary) */}
                        <Button title="Entrar" onPress={handleLogin} variant="primary" />

                        {/* Link recuperar senha */}
                        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
                            <Text style={styles.linkText}>Esqueci minha senha</Text>
                        </TouchableOpacity>

                        <View style={{ height: 1, backgroundColor: '#CCC', marginVertical: 16 }} />

                        {/* Login social (Secondary) */}
                        <View style={styles.socialContainer}>
                            <Button title="Entrar com Google" onPress={handleLoginWithGoogle} variant="secondary" />
                            <View style={{ height: 10 }} />
                            <Button title="Entrar com Facebook" onPress={handleLoginWithFacebook} variant="secondary" />
                        </View>

                        {/* Link para cadastro */}
                        <View style={styles.registerContainer}>
                            <Text style={styles.text}>Não tem uma conta?</Text>
                            <TouchableOpacity onPress={handleGoToRegister}>
                                <Text style={styles.linkText}>Cadastre-se</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>
            </View>
        </ImageBackground>
    );
};

export default Login;