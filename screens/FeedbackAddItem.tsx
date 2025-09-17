import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Header from '../src/components/Header';
import Card from '../src/components/Card';
import Button from '../src/components/Button';
import { Colors } from '../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; // Importe este tipo
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importe o RootStackParamList para tipagem correta
import { RootStackParamList } from '../src/types/types'; 

type FeedbackRouteProps = RouteProp<RootStackParamList, 'FeedbackAddItem'>;
// Adicione o tipo de navegação para ter acesso a 'Item'
type FeedbackAddItemNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FeedbackAddItem'>;

const FeedbackAddItem: React.FC = () => {
    // Use a tipagem de navegação que criamos
    const navigation = useNavigation<FeedbackAddItemNavigationProp>();
    const route = useRoute<FeedbackRouteProps>();
    const item = route.params?.item; // Mudei de formData para item para maior clareza

    useEffect(() => {
        const clearStorage = async () => {
            try {
                await AsyncStorage.multiRemove(['@addItemFormData', '@addItemCurrentStep']);
                console.log('Dados do formulário limpos com sucesso!');
            } catch (e) {
                console.error('Erro ao limpar dados do AsyncStorage:', e);
            }
        };
        clearStorage();
    }, []);

    if (!item) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.title}>Erro ao carregar os dados.</Text>
                <Button title="Voltar" onPress={() => navigation.goBack()} />
            </View>
        );
    }
    
    // Acessa as propriedades do item diretamente
    const itemName = item[0];
    const itemImages = item[4];
    const formattedAddress = `${item[5]?.neighborhood}, ${item[5]?.city} - ${item[5]?.state}`;

    const handleViewItem = () => {
        // Altera a ação do botão para navegar para a tela 'Item'
        // Passa o objeto completo do item para a nova tela
        navigation.navigate('Item');
    };

    const handlePublishAnother = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'AddItem' }], // Não precisa de params se for um objeto vazio
        });
    };

    return (
        <View style={styles.container}>
            <Header type="page" pageTitle="Publicação concluída" />

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Seu item foi publicado com sucesso!</Text>
                <Text style={styles.description}>
                    Agora outras pessoas podem encontrá-lo e solicitar uma troca. Você receberá notificações sempre que houver interesse!
                </Text>

                <View style={styles.divider} />

                <Card style={styles.card}>
                    {itemImages && itemImages.length > 0 && (
                        <Image source={{ uri: itemImages[0] }} style={styles.itemImage} />
                    )}
                    <Text style={styles.itemName}>{itemName}</Text>
                    
                    <Text style={styles.itemDetail}>
                        <Text style={styles.boldDetailText}>Descrição: </Text>{item[1]}
                    </Text>
                    <Text style={styles.itemDetail}>
                        <Text style={styles.boldDetailText}>Categoria: </Text>{item[2]}
                    </Text>
                    <Text style={styles.itemDetail}>
                        <Text style={styles.boldDetailText}>Estado: </Text>{item[3]}
                    </Text>
                    
                    <View style={styles.locationRow}>
                        <Ionicons name="location-sharp" size={16} color={Colors.light.textPrimary} />
                        <Text style={styles.itemDetail}>
                            <Text style={styles.boldDetailText}>{formattedAddress}</Text>
                        </Text>
                    </View>

                    <View style={styles.buttonsRow}>
                        <Button title="Ver meu item" variant="secondary" onPress={handleViewItem} />
                        <Button title="Publicar outro item" variant="primary" onPress={handlePublishAnother} />
                    </View>
                </Card>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.backgroundPrimary },
    content: { padding: 16, alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, textAlign: 'left', width: '100%' },
    description: { fontSize: 16, color: Colors.light.textSecondary, marginBottom: 16, textAlign: 'left', width: '100%' },
    divider: { height: 1, backgroundColor: '#CCC', width: '100%', marginVertical: 16 },
    card: { padding: 24, width: '100%' },
    itemImage: { width: '100%', height: 200, borderRadius: 8, marginBottom: 12 },
    itemName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    itemDetail: { fontSize: 14, color: Colors.light.textSecondary, marginBottom: 4 },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 4 },
    buttonsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, width: '100%' },
    center: { justifyContent: 'center', alignItems: 'center' },
    boldDetailText: {
        fontWeight: 'bold',
        color: Colors.light.textPrimary,
    },
});

export default FeedbackAddItem;