import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../src/constants/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.backgroundPrimary,
    },
    section: {
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.textPrimary,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: Colors.light.textSecondary,
        marginBottom: 12,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: 12, 
    },
    statsBox: {
        marginHorizontal: 16,
        marginBottom: 24,
        borderRadius: 8,
        overflow: 'hidden',
        minHeight: 250,
    },
    statsText: {
        fontSize: 24,
        lineHeight: 30,
        color: Colors.light.backgroundPrimary,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
    },
});