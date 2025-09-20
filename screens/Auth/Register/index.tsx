import React, { useState } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../src/types/RootStackParamList';
import Button from '../../../src/components/Button/index';
import Card from '../../../src/components/Cards/Card/index';
import Header from '../../../src/components/Header/index';
import { Colors } from '../../../src/constants/theme';
import { useAuth } from '../../../context/AuthContext';
import { styles } from './styles';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const Register: React.FC = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password || !acceptedTerms) {
            Alert.alert('Erro', 'Preencha todos os campos e aceite os termos');
            return;
        }

        // validações básicas
        if (!email.includes('@')) {
            Alert.alert('Erro', 'Digite um email válido');
            return;
        }

        if (password.length < 7) {
            Alert.alert('Erro', 'A senha deve ter no mínimo 7 caracteres');
            return;
        }

        // chamada ao contexto para salvar o usuário
        const error = await register(name, email, password);
        if (error) {
            Alert.alert('Erro de cadastro', error);
            return;
        }

        navigation.navigate('Login');
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
            source={require('../../../src/assets/background.jpg')}
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

export default Register;
