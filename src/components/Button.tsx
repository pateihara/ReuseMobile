import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../constants/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary'; // Novo prop para diferenciar tipos
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled = false, variant = 'primary' }) => {
    const buttonStyles = [
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        disabled && styles.disabledButton,
    ];

    const textStyles = [
        styles.buttonText,
        variant === 'primary' ? styles.primaryText : styles.secondaryText,
        disabled && styles.disabledText,
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
        >
            <Text style={textStyles}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButton: {
        backgroundColor: Colors.light.primary,
    },
    secondaryButton: {
        backgroundColor: Colors.dark.backgroundSecondary,
        borderWidth: 1,
        borderColor: Colors.dark.border,
    },
    disabledButton: {
        opacity: 0.6,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: Fonts?.sans,
    },
    primaryText: {
        color: Colors.light.backgroundSecondary,
    },
    secondaryText: {
        color: Colors.dark.textPrimary,
    },
    disabledText: {
        color: Colors.light.textSecondary,
    },
});

export default Button;
