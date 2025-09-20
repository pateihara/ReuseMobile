import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../../src/constants/theme';

export const styles = StyleSheet.create({
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
        backgroundColor: Colors.light.error, 
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
        color: Colors.light.backgroundSecondary, 
    },
    disabledText: {
        color: Colors.light.textSecondary,
    },
});