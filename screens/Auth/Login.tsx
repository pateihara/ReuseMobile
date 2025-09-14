import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../src/types/RootStackParamList';
import Button from '../../src/components/Button';
import Card from '../../src/components/Card';
import Header from '../../src/components/Header';
import { Colors } from '../../src/constants/theme';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login: React.FC = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Email:', email, 'Senha:', password);
        navigation.navigate('MainApp', { screen: 'Home' });
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
            source={require('../../src/assets/background.jpg')}
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

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    card: {
        backgroundColor: Colors.light.backgroundSecondary,
        borderRadius: 8,
        padding: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: Colors.light.textPrimary,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: Colors.light.textSecondary,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
    },
    forgotPassword: {
        alignItems: 'center',
        marginVertical: 8,
    },
    linkText: {
        color: Colors.light.secondary,
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: 5,
        textDecorationLine: 'underline',
    },
    socialContainer: {
        marginTop: 16,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
        gap: 4,
    },
});

export default Login;
