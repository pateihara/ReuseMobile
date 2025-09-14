import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Button from '../../src/components/Button';
import Card from '../../src/components/Card';

const ProfileLoggedInScreen: React.FC = () => {
const { user, logout } = useAuth();

return (
    <View style={styles.container}>
    <Card>
        <Text style={styles.title}>Olá, {user?.name}!</Text>
        <Text style={styles.text}>E-mail: {user?.email}</Text>
        <Button
        title="Sair"
        onPress={logout}
        />
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
title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
},
text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
},
});

export default ProfileLoggedInScreen;