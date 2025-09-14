import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Colors } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons'; // Importação correta do Ionicons

interface SearchInputProps extends TextInputProps {}

const SearchInput: React.FC<SearchInputProps> = (props) => {
return (
    <View style={styles.container}>
    {/* Use o componente Ionicons importado */}
    <Ionicons name="search-outline" size={20} color={Colors.light.textPrimary} style={styles.icon} />
    <TextInput
        style={styles.input}
        placeholderTextColor={Colors.light.textSecondary}
        placeholder="Buscar na ReUse..."
        {...props}
    />
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundPrimary,
    borderColor: Colors.light.border,
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 16,
    height: 48,
},
icon: {
    marginRight: 8,
},
input: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.textPrimary,
    padding: 0,
},
});

export default SearchInput;