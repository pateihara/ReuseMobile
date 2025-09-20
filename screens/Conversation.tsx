import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from 'react-native';
import Header from '../src/components/Header';
import { Colors } from '../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../src/types/types';
import Feedback from '../src/components/Feedback';

const { width } = Dimensions.get('window');

const initialMessages = [
    { id: '1', text: 'Olá, Carlos! Vi que você se interessou pelo livro Dom Casmurro. Eu tenho uma camiseta em ótimo estado, gostaria de trocar?', sender: 'Mariana' },
    { id: '2', text: 'Aguarde Carlos aceitar a solicitação para continuar.', sender: 'system' },
    { id: '3', text: 'Carlos aceitou a solicitação.', sender: 'system' },
    { id: '4', text: 'Olá, Mariana! A camiseta me interessa, sim. Você poderia me mandar uma foto dela?', sender: 'Carlos' },
    { id: '5', text: 'Claro!', sender: 'Mariana' },
    { id: '6', text: 'Perfeito, parece bem conservada. Podemos combinar a troca? Estou em São Paulo – Vila Mariana.', sender: 'Carlos' },
    { id: '7', text: 'Ótimo, moro perto! Podemos combinar na estação de metrô.', sender: 'Mariana' },
    { id: '8', text: 'Combinado então 🙌 Vou marcar a troca como aceita.', sender: 'Carlos' },
    { id: '9', text: 'Aguardando a confirmação de troca mútua, para conclusão da solicitação.', sender: 'system' },
    { id: '10', text: 'Carlos atualizou o status para: troca aceita.', sender: 'system' },
    { id: '11', text: 'Mariana atualizou o status para: troca confirmada.', sender: 'system' },
    { id: '12', text: 'Carlos atualizou o status para: troca confirmada.', sender: 'system' },
    { id: '13', text: 'Troca Concluída! O item não é o que você pediu. Deixe uma avaliação!', sender: 'final' },
];

const Conversation: React.FC = () => {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleSend = () => {
        if (input.trim()) {
            const newMessage = {
                id: `msg-${messages.length + 1}`,
                text: input,
                sender: 'Mariana',
            };
            setMessages([...messages, newMessage]);
            setInput('');
        }
    };

    const renderMessage = ({ item }) => {
        const isSender = item.sender === 'Mariana';
        const isSystem = item.sender === 'system';
        const isFinal = item.sender === 'final';

        if (isSystem) {
            return (
                <View style={styles.systemMessageContainer}>
                    <Text style={styles.systemMessageText}>{item.text}</Text>
                </View>
            );
        }

        if (isFinal) {
            return (
                <Feedback
                    type="success"
                    message={item.text}
                    showButtons={true}
                    onGoBack={() => navigation.navigate('MainApp')}
                    onRate={() => console.log('Avaliação enviada')}
                />
            );
        }

        return (
            <View style={[styles.bubbleContainer, isSender ? styles.senderContainer : styles.receiverContainer]}>
                <View style={[styles.bubble, isSender ? styles.senderBubble : styles.receiverBubble]}>
                    <Text style={[styles.senderName, isSender ? null : { color: Colors.light.textPrimary }]}>{item.sender}</Text>
                    <Text style={[styles.bubbleText, isSender ? styles.senderText : styles.receiverText]}>{item.text}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Header type="page" pageTitle="Conversa" />
            
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputContainer}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        value={input}
                        onChangeText={setInput}
                        placeholder="Digite..."
                        placeholderTextColor={Colors.light.textSecondary}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <Ionicons name="send" size={24} color={Colors.light.backgroundPrimary} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.backgroundSecondary,
    },
    listContent: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    bubbleContainer: {
        flexDirection: 'row',
        marginVertical: 4,
    },
    senderContainer: {
        justifyContent: 'flex-end',
    },
    receiverContainer: {
        justifyContent: 'flex-start',
    },
    bubble: {
        maxWidth: '80%',
        borderRadius: 16,
        padding: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    senderBubble: {
        backgroundColor: Colors.light.secondary,
        borderBottomRightRadius: 4,
    },
    receiverBubble: {
        backgroundColor: Colors.light.backgroundPrimary,
        borderBottomLeftRadius: 4,
    },
    senderName: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.light.textPrimary,
    },
    bubbleText: {
        fontSize: 16,
    },
    senderText: {
        color: Colors.light.backgroundPrimary,
    },
    receiverText: {
        color: Colors.light.textPrimary,
    },
    systemMessageContainer: {
        alignItems: 'center',
        marginVertical: 8,
    },
    systemMessageText: {
        fontSize: 12,
        color: Colors.light.textSecondary,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    inputContainer: {
        backgroundColor: Colors.light.backgroundSecondary,
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.backgroundPrimary,
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: Colors.light.textPrimary,
    },
    sendButton: {
        backgroundColor: Colors.light.primary,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
});

export default Conversation;
