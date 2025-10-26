// src/components/Feedback/index.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/theme';
import Button from '../Button';
import { styles } from './styles';

type FeedbackType = 'success' | 'error' | 'warning' | 'info';

interface FeedbackProps {
    type: FeedbackType;
    message: string;
    showButtons?: boolean;
    onGoBack?: () => void;
    onRate?: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ type, message, showButtons = false, onGoBack, onRate }) => {
    let iconName = '';
    let iconColor = '';
    let backgroundColor = '';

    switch (type) {
        case 'success':
            iconName = 'checkmark-circle-outline';
            iconColor = Colors.light.success;
            backgroundColor = Colors.light.backgroundSuccess;
            break;
        case 'error':
            iconName = 'close-circle-outline';
            iconColor = Colors.light.error;
            backgroundColor = Colors.light.backgroundError;
            break;
        case 'warning':
            iconName = 'alert-circle-outline';
            iconColor = Colors.light.attention;
            backgroundColor = Colors.light.backgroundAttention;
            break;
        case 'info':
            iconName = 'information-circle-outline';
            iconColor = Colors.light.textSecondary; // precisa existir no seu theme
            backgroundColor = Colors.light.backgroundSecondary; // idem
            break;
    }

    return (
        <View style={[styles.container, { backgroundColor, borderColor: iconColor }]}>
            <View style={styles.messageContainer}>
                <Ionicons name={iconName} size={24} color={iconColor} style={styles.icon} />
                <Text style={[styles.message, { color: iconColor }]}>{message}</Text>
            </View>

            {showButtons && (
                <View style={styles.buttonsContainer}>
                    <Button
                        title="Voltar"
                        onPress={onGoBack}
                        variant="secondary"
                        style={{ flex: 1, marginRight: 8 }}
                    />
                    <Button
                        title="Avaliar"
                        onPress={onRate}
                        variant="success"
                        style={{ flex: 1, marginLeft: 8 }}
                    />
                </View>
            )}
        </View>
    );
};

export default Feedback;
