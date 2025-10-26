// src/components/Inputs/TextInput/index.tsx
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Colors } from '../../../constants/theme';
import { styles } from './styles';

interface InputProps {
label: string;
description?: string;
value: string;
onChangeText: (text: string) => void;
placeholder?: string;
}

const Input: React.FC<InputProps> = ({
label,
description,
value,
onChangeText,
placeholder,
}) => {
return (
    <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>

    {description && <Text style={styles.description}>{description}</Text>}

    <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.textSecondary}
    />
    </View>
);
};

export default Input;