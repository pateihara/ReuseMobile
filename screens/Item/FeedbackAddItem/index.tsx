import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, Alert } from 'react-native';
import Header from '../../../src/components/Header/index';
import Card from '../../../src/components/Cards/Card/index';
import Button from '../../../src/components/Button/index';
import { Colors } from '../../../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

import { RootStackParamList } from '../../../src/types/types'; 

type FeedbackRouteProps = RouteProp<RootStackParamList, 'FeedbackAddItem'>;
type FeedbackAddItemNavigationProp = NativeStackNavigationProp<RootStackParamList, 'FeedbackAddItem'>;

const FeedbackAddItem: React.FC = () => {
    const navigation = useNavigation<FeedbackAddItemNavigationProp>();
    const route = useRoute<FeedbackRouteProps>();
    const item = route.params?.item; 

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
    
    const itemName = item[0];
    const itemImages = item[4];
    const formattedAddress = `${item[5]?.neighborhood}, ${item[5]?.city} - ${item[5]?.state}`;

    const handleViewItem = () => {
        navigation.navigate('Item');
    };

    const handlePublishAnother = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'AddItem' }], 
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

export default FeedbackAddItem;