import React, { useState } from 'react';
import {
View,
Text,
StyleSheet,
ImageBackground,
TextInput,
TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../src/types/RootStackParamList';
import Button from '../../src/components/Button';
import Card from '../../src/components/Card';
import Header from '../../src/components/Header';
import { Colors } from '../../src/constants/theme';
import Feedback from '../../src/components/Feedback';

type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
RootStackParamList,
'ForgotPassword'
>;

const ForgotPassword: React.FC = () => {
const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

const [email, setEmail] = useState('');
const [linkSent, setLinkSent] = useState(false);

const handleSendLink = () => {
    console.log('Email para recuperação:', email);
    // Aqui você chamaria sua API para envio do link
    setLinkSent(true);
};

const handleBackToLogin = () => {
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
            {!linkSent ? (
            <>
                <Text style={styles.title}>Recuperar senha</Text>
                <Text style={styles.text}>
                Digite seu email cadastrado para receber as instruções
                </Text>

                <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                />

                <Button
                title="Enviar link de recuperação"
                onPress={handleSendLink}
                variant="primary"
                />
            </>
            ) : (
            <>
                <Text style={styles.title}>Recuperar senha</Text>
                <Feedback type='warning' message='Se este email estiver cadastrado, você receberá um link para
                redefinir sua senha.' / >
            
        

                <Button
                title="Voltar para Login"
                onPress={handleBackToLogin}
                variant="primary"
                />
            </>
            )}
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
});

export default ForgotPassword;
