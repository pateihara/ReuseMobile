import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../src/types/RootStackParamList';
import Button from '../../src/components/Button';
import Card from '../../src/components/Card';
import Header from '../../src/components/Header';
import { Colors } from '../../src/constants/theme';
import { useAuth } from '../../context/AuthContext';


type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const Register: React.FC = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    
    const { login } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleRegister = () => {
    if (!name || !email || !password || !acceptedTerms) {
        return alert('Preencha todos os campos e aceite os termos');
    }

    // Simula registro de usuário
    const newUser = {
        id: String(Date.now()),
        name,
        email,
    };

    login(newUser) // já registra e loga o usuário
        .then(() => {
        navigation.navigate('MainApp', { screen: 'Profile' });
        })
        .catch(err => console.error(err));
};

    const handleRegisterWithGoogle = () => {
        // Lógica de registro com Google
    };

    const handleRegisterWithFacebook = () => {
        // Lógica de registro com Facebook
    };

    const handleGoToLogin = () => {
        navigation.navigate('Login');
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
                        <Text style={styles.title}>Crie sua conta</Text>
                        <Text style={styles.text}>Preencha os dados abaixo para se registrar</Text>

                        {/* Inputs */}
                        <TextInput
                            placeholder="Nome"
                            value={name}
                            onChangeText={setName}
                            style={styles.input}
                        />
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

                        {/* Termos e Condições */}
                        <View style={styles.termsContainer}>
                            <Switch
                                value={acceptedTerms}
                                onValueChange={setAcceptedTerms}
                                thumbColor={acceptedTerms ? Colors.light.primary : '#ccc'}
                            />
                            <Text style={styles.termsText}>
                                Aceito os <Text style={styles.linkText}>Termos e Condições</Text>
                            </Text>
                        </View>

                        {/* Botão Cadastrar (Primary) */}
                        <Button title="Cadastrar" onPress={handleRegister} variant="primary" disabled={!acceptedTerms} />

                        <View style={{ height: 1, backgroundColor: '#CCC', marginVertical: 16 }} />

                        {/* Registro social (Secondary) */}
                        <View style={styles.socialContainer}>
                            <Button title="Cadastrar com Google" onPress={handleRegisterWithGoogle} variant="secondary" />
                            <View style={{ height: 10 }} />
                            <Button title="Cadastrar com Facebook" onPress={handleRegisterWithFacebook} variant="secondary" />
                        </View>

                        {/* Link para Login */}
                        <View style={styles.loginContainer}>
                            <Text style={styles.text}>Já tem uma conta?</Text>
                            <TouchableOpacity onPress={handleGoToLogin}>
                                <Text style={styles.linkText}>Login</Text>
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
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    termsText: {
        marginLeft: 8,
        color: Colors.light.textSecondary,
    },
    linkText: {
        color: Colors.light.secondary,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    socialContainer: {
        marginTop: 16,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
        gap: 4,
    },
});

export default Register;
