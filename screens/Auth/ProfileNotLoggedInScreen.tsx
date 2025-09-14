import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../src/types/RootStackParamList';
import Button from '../../src/components/Button';
import Card from '../../src/components/Card';
import Header from '../../src/components/Header';
import { Colors } from '../../src/constants/theme';



type ProfileScreenNavigationProp = NativeStackNavigationProp<
RootStackParamList,
'ProfileNotLoggedIn'
>;

const ProfileNotLoggedInScreen: React.FC = () => {
const navigation = useNavigation<ProfileScreenNavigationProp>();

return (
    <ImageBackground
        source={require('../../src/assets/background.jpg')}
        style={styles.background}
        resizeMode="cover"
    >
<View style={styles.container}>
        <Header type="logo"/>
    <View style={styles.content}>
        <Card style={styles.card}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.text}>
            Faça login ou cadastre-se para gerenciar seu perfil.
        </Text>

        <Button title="Entrar" onPress={() => navigation.navigate('Login')} />
        <View style={styles.spacer} />
        <Button title="Cadastrar" onPress={() => navigation.navigate('Register')} />
        </Card>
    </View>
</View>
</ImageBackground>
);
};

const styles = StyleSheet.create({
background: {
    flex: 1,
    width: '100%',
    height: '100%',
},
    container: {
    flex: 1,
    backgroundColor: 'transparent', // Fundo branco com opacidade
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
spacer: {
    height: 10,
},
});

export default ProfileNotLoggedInScreen;
