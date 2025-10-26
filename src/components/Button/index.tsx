// src/components/Button/index.tsx
import React from 'react';
import { TouchableOpacity, Text,  ViewStyle } from 'react-native';
import { styles } from './styles';

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

export default Button;