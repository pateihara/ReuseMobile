import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../src/types/RootStackParamList';
import Button from '../../../src/components/Button/index';
import Card from '../../../src/components/Cards/Card/index';
import Header from '../../../src/components/Header/index';
import { styles } from './styles';



type ProfileScreenNavigationProp = NativeStackNavigationProp<
RootStackParamList,
'ProfileNotLoggedIn'
>;

const ProfileNotLoggedInScreen: React.FC = () => {
const navigation = useNavigation<ProfileScreenNavigationProp>();

return (
    <ImageBackground
        source={require('../../../src/assets/background.jpg')}
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


export default ProfileNotLoggedInScreen;
