import { StyleSheet } from 'react-native';
import { Colors } from '../../../src/constants/theme';  

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.backgroundPrimary,
    },
    content: {
        paddingHorizontal: 16,
    },
    category: {
        color: Colors.light.secondary,
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 16,
    },
    productName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.light.textPrimary,
        marginTop: 4,
    },
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 8,
    },
    user: {
        fontSize: 14,
        color: Colors.light.textSecondary,
    },
    description: {
        fontSize: 16,
        color: Colors.light.textSecondary,
        marginBottom: 16,
    },
    section: {
        marginVertical: 16,
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
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.light.backgroundSecondary,
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
