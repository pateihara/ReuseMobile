import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import Button from '../src/components/Button';
import Card from '../src/components/Card';
import { Colors } from '../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';

const ProfileLoggedInScreen: React.FC = () => {
const { user, logout } = useAuth();

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
        <Button variant="primary" title="Adicionar Novo Item" onPress={() => {}} style={{ marginBottom: 10 }} />
        <Button variant="secondary" title="Editar Perfil" onPress={() => {}} style={{ marginBottom: 10 }} />
        <Button variant="secondary" title="Trocas em Andamento" onPress={() => {}} style={{ marginBottom: 10 }} />
        <Button variant="secondary" title="Produtos Ativos" onPress={() => {}} style={{ marginBottom: 10 }} />
        <Button variant="secondary" title="Trocas Concluídas" onPress={() => {}} style={{ marginBottom: 10 }} />
        <Button variant="secondary" title="Minhas Avaliações" onPress={() => {}} style={{ marginBottom: 10 }} />
        <Button title="Sair" onPress={logout} />
    </Card>
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F5F5F5',
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.textPrimary,
    flex: 1, // Faz o texto ocupar o espaço restante
},
profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
},
text: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
    color: Colors.light.textSecondary,
},
infoContainer: {
    marginBottom: 20,
},
infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
},
infoText: {
    fontSize: 16,
    color: Colors.light.textPrimary,
    fontWeight: '500',
},
});

export default ProfileLoggedInScreen;
