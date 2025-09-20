import { StyleSheet } from 'react-native';
import { Colors } from '../../../src/constants/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.backgroundSecondary,
    },
    listContent: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    bubbleContainer: {
        flexDirection: 'row',
        marginVertical: 4,
    },
    senderContainer: {
        justifyContent: 'flex-end',
    },
    receiverContainer: {
        justifyContent: 'flex-start',
    },
    bubble: {
        maxWidth: '80%',
        borderRadius: 16,
        padding: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    senderBubble: {
        backgroundColor: Colors.light.secondary,
        borderBottomRightRadius: 4,
    },
    receiverBubble: {
        backgroundColor: Colors.light.backgroundPrimary,
        borderBottomLeftRadius: 4,
    },
    senderName: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.light.textPrimary,
    },
    bubbleText: {
        fontSize: 16,
    },
    senderText: {
        color: Colors.light.backgroundPrimary,
    },
    receiverText: {
        color: Colors.light.textPrimary,
    },
    systemMessageContainer: {
        alignItems: 'center',
        marginVertical: 8,
    },
    systemMessageText: {
        fontSize: 12,
        color: Colors.light.textSecondary,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    inputContainer: {
        backgroundColor: Colors.light.backgroundSecondary,
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.light.border,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.backgroundPrimary,
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: Colors.light.textPrimary,
    },
    sendButton: {
        backgroundColor: Colors.light.primary,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
});