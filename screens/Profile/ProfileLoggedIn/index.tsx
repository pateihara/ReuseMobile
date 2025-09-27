import React from 'react';
import { View, Text, Image } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../../src/components/Button/index';
import Card from '../../../src/components/Cards/Card/index';
import { Colors } from '../../../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import AddItem from '../../Item/AddItem';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../src/types/types';
import { useNavigation } from '@react-navigation/native';

const ProfileLoggedInScreen: React.FC = () => {
const { user, logout } = useAuth();
const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

// Dados de exemplo, substitua com dados reais do usuário
const city = "Curitiba";
const exchanges = 12;
const activeProducts = 5;
const profilePhoto = "https://i.pravatar.cc/150?img=43"; // Foto fake

return (
    <View style={styles.container}>
    <Card>
        {/* Cabeçalho com foto e saudação */}
        <View style={styles.header}>
        <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
        <Text style={styles.title}>Olá, {user?.name}!</Text>
        </View>

        <Text style={styles.text}>Biografia com uma breve descrição do usuário.</Text>

        {/* Informações do usuário */}
        <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={20} color={Colors.light.textPrimary} />
            <Text style={styles.infoText}>{user?.name}</Text>
        </View>
        <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color={Colors.light.textPrimary} />
            <Text style={styles.infoText}>{city}</Text>
        </View>
        <View style={styles.infoRow}>
            <Ionicons name="swap-horizontal-outline" size={20} color={Colors.light.textPrimary} />
            <Text style={styles.infoText}>{exchanges} trocas efetuadas</Text>
        </View>
        <View style={styles.infoRow}>
            <Ionicons name="cube-outline" size={20} color={Colors.light.secondary} />
            <Text style={[styles.infoText, { color: Colors.light.secondary }]}>
            {activeProducts} produtos ativos
            </Text>
        </View>
        </View>

        {/* Botões */}
        <Button variant="primary" title="Adicionar Novo Item" onPress={() => {navigation.navigate('AddItem')}} style={{ marginBottom: 10 }} />
        <Button variant="secondary" title="Editar Perfil" onPress={() => {navigation.navigate('Desenvolvimento')}} style={{ marginBottom: 10 }} />
        <Button variant="secondary" title="Trocas em Andamento" onPress={() => {navigation.navigate('TradesScreen')}} style={{ marginBottom: 10 }} />
        <Button variant="secondary" title="Produtos Ativos" onPress={() => {navigation.navigate('Desenvolvimento')}} style={{ marginBottom: 10 }} />
        <Button variant="secondary" title="Trocas Concluídas" onPress={() => {navigation.navigate('Desenvolvimento')}} style={{ marginBottom: 10 }} />
        <Button variant="secondary" title="Minhas Avaliações" onPress={() => {navigation.navigate('Desenvolvimento')}} style={{ marginBottom: 10 }} />
        <Button title="Sair" onPress={logout} />
    </Card>
    </View>
);
};

export default ProfileLoggedInScreen;
