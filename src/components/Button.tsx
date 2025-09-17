import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Fonts } from '../constants/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled = false, variant = 'primary', style }) => {
    
    // A lógica de aplicação de estilos foi simplificada com um objeto de mapeamento
    const getButtonStyles = () => {
        const baseStyle = styles.button;
        const variantStyle = styles[`${variant}Button`];
        const disabledStyle = disabled ? styles.disabledButton : null;
        return [baseStyle, variantStyle, disabledStyle, style];
    };

    const getButtonTextStyles = () => {
        const baseStyle = styles.buttonText;
        const variantTextStyle = styles[`${variant}Text`];
        const disabledTextStyle = disabled ? styles.disabledText : null;
        return [baseStyle, variantTextStyle, disabledTextStyle];
    };

    return (
        <TouchableOpacity
            style={getButtonStyles()}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
        >
            <Text style={getButtonTextStyles()}>{title}</Text>
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
    successButton: {
        backgroundColor: Colors.light.success,
    },
    dangerButton: {
        backgroundColor: Colors.light.error, // Estilo para a variante 'danger'
    },
    disabledButton: {
        opacity: 0.2,
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
    successText: {
        color: Colors.light.backgroundSecondary,
    },
    dangerText: {
        color: Colors.light.backgroundSecondary, // Cor do texto para a variante 'danger'
    },
    disabledText: {
        color: Colors.light.textSecondary,
    },
});

export default Button;