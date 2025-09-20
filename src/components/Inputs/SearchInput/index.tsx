import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Colors } from '../../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';  

interface SearchInputProps extends TextInputProps {}

const SearchInput: React.FC<SearchInputProps> = (props) => {
return (
    <View style={styles.container}>
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

export default SearchInput;