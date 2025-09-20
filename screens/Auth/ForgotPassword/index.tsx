import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../src/types/types';
import Button from '../../../src/components/Button/index';
import Card from '../../../src/components/Cards/Card/index';
import Header from '../../../src/components/Header/index';
import Feedback from '../../../src/components/Feedback';
import { styles } from './styles';

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
            source={require('../../../src/assets/background.jpg')}
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

                                <Feedback
                                    type="warning"
                                    message="Se este email estiver cadastrado, você receberá um link para redefinir sua senha."
                                />

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

export default ForgotPassword;
