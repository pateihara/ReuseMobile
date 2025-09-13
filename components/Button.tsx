import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../constants/theme'; // Importe apenas as cores

interface ButtonProps {
title: string;
onPress: () => void;
disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled = false }) => {
return (
    <TouchableOpacity
    style={[styles.button, disabled && styles.disabledButton]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.7}
    >
    <Text style={[styles.buttonText, disabled && styles.disabledText]}>
        {title}
    </Text>
    </TouchableOpacity>
);
};

const styles = StyleSheet.create({
button: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
},
disabledButton: {
    backgroundColor: Colors.light.textSecondary,
    opacity: 0.6,
},
buttonText: {
    color: Colors.light.backgroundSecondary,
    fontSize: 16,
    fontWeight: 'bold', // O peso da fonte pode ser definido aqui
    fontFamily: Fonts?.sans,
},
disabledText: {
    color: Colors.light.backgroundSecondary,
},
});

export default Button;