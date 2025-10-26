// src/components/Feedback/styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        marginVertical: 20,
        borderWidth: 1,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    icon: {
        marginRight: 10,
    },
    message: {
        fontSize: 16,
        flex: 1,
        textAlign: 'left',
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
});
