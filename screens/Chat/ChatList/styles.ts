import { StyleSheet } from 'react-native';
import { Colors } from '../../../src/constants/theme';

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.backgroundPrimary },
    chatCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        backgroundColor: Colors.light.backgroundSecondary,
        marginBottom: 12,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    chatInfo: { flex: 1 },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.light.textPrimary,
    },
    userName: {
        fontSize: 14,
        color: Colors.light.secondary,
        marginBottom: 2,
    },
    lastMessage: {
        fontSize: 14,
        color: Colors.light.textSecondary,
    },
    chatMeta: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 50,
    },
    time: {
        fontSize: 12,
        color: Colors.light.textSecondary,
    },
    badge: {
        backgroundColor: Colors.light.primary,
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginTop: 6,
    },
    badgeText: {
        color: Colors.light.backgroundPrimary,
        fontSize: 12,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
});