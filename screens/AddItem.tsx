import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddItem = () => (
<View style={styles.container}>
    <Text>Adicionar item</Text>
</View>
);

const styles = StyleSheet.create({
container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default AddItem;