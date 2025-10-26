//screens/Chat/ChatList/index.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Header from '../../../src/components/Header/index';
import Feedback from '../../../src/components/Feedback';
import Button from '../../../src/components/Button/index';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

type Conversation = {
    id: string;
    item: {
        id: string;
        name: string;
        image: string;
    };
    user: {
        id: string;
        name: string;
        avatar?: string;
    };
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
};

const conversations: Conversation[] = [
    {
        id: '1',
        item: {
            id: '101',
            name: 'Camiseta preta tamanho M',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        },
        user: {
            id: '201',
            name: 'João Silva',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        lastMessage: 'Podemos marcar a entrega amanhã?',
        lastMessageTime: '14:30',
        unreadCount: 2,
    },
    {
        id: '2',
        item: {
            id: '102',
            name: 'Livro Dom Casmurro',
            image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400',
        },
        user: {
            id: '202',
            name: 'Maria Oliveira',
            avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
        },
        lastMessage: 'Gostei do seu anúncio!',
        lastMessageTime: 'Ontem',
        unreadCount: 0,
    },
];

const ChatList: React.FC = () => {
    const navigation = useNavigation<any>();

    const renderItem = ({ item }: { item: Conversation }) => (
        <TouchableOpacity
            style={styles.chatCard}
            onPress={() => navigation.navigate('Conversation', { chatId: item.id })}
        >
            <Image source={{ uri: item.item.image }} style={styles.itemImage} />

            <View style={styles.chatInfo}>
                <Text style={styles.itemName}>{item.item.name}</Text>
                <Text style={styles.userName}>{item.user.name}</Text>
                <Text style={styles.lastMessage} numberOfLines={1}>
                    {item.lastMessage}
                </Text>
            </View>

            <View style={styles.chatMeta}>
                <Text style={styles.time}>{item.lastMessageTime}</Text>
                {item.unreadCount > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.unreadCount}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header type="page" pageTitle="Minhas Conversas" />

            {conversations.length > 0 ? (
                <FlatList
                    data={conversations}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ padding: 16 }}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Feedback
                        type="info"
                        message="Você ainda não iniciou nenhuma troca."
                    />
                    <Button
                        title="Explorar itens"
                        variant="primary"
                        onPress={() => navigation.navigate('Home')}
                        style={{ marginTop: 20 }}
                    />
                </View>
            )}
        </View>
    );
};

export default ChatList;
