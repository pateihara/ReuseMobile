import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

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

const styles = StyleSheet.create({
container: {
    gap: 8,
},
label: {
    color: Colors.light.textPrimary,
    fontSize: 16,
},
description: {
    color: Colors.light.textSecondary,
    fontSize: 16,
},
input: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderColor: Colors.light.border,
    borderWidth: 1,
    borderRadius: 8,
    color: Colors.light.textSecondary,
    padding: 16,
    fontSize: 16,
},
});

export default Input;