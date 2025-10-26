// screens/Auth/Register/index.tsx
import React, { useState } from 'react';
import { View, Text, ImageBackground, TextInput, TouchableOpacity, Switch, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../../../src/components/Button/index';
import Card from '../../../src/components/Cards/Card/index';
import Header from '../../../src/components/Header/index';
import { Colors } from '../../../src/constants/theme';
import { useAuth } from '../../../context/AuthContext';
import { styles } from './styles';
import { PublicStackParamList } from '../../../src/types/navigation';

type RegisterNavProp = NativeStackNavigationProp<PublicStackParamList, 'Register'>;

const Register: React.FC = () => {
  const navigation = useNavigation<RegisterNavProp>();
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

    if (!email.includes('@')) {
      Alert.alert('Erro', 'Digite um email válido');
      return;
    }

    if (password.length < 7) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 7 caracteres');
      return;
    }

    const error = await register(name, email, password);
    if (error) {
      Alert.alert('Erro de cadastro', error);
      return;
    }

    Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    navigation.navigate('Login');
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

            <Button
              title="Cadastrar"
              onPress={handleRegister}
              variant="primary"
              disabled={!acceptedTerms}
            />

            <View style={{ height: 1, backgroundColor: '#CCC', marginVertical: 16 }} />

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
