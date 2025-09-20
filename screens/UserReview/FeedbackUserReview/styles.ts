import { StyleSheet } from "react-native";
import { Colors } from "../../../src/constants/theme";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.backgroundPrimary },
        content: { padding: 16, alignItems: 'center' },
        title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, textAlign: 'left', width: '100%' },
        description: { fontSize: 16, color: Colors.light.textSecondary, marginBottom: 16, textAlign: 'left', width: '100%' },
        divider: { height: 1, backgroundColor: '#CCC', width: '100%', marginVertical: 16 },
        card: { padding: 24, width: '100%' },
        itemImage: { width: '100%', height: 200, borderRadius: 8, marginBottom: 12 },
        itemName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
        itemDetail: { fontSize: 14, color: Colors.light.textSecondary, marginBottom: 4 },
        locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 4 },
        buttonsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, width: '100%' },
        center: { justifyContent: 'center', alignItems: 'center' },
        boldDetailText: {
            fontWeight: 'bold',
            color: Colors.light.textPrimary,
        },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    ratingText: {
        marginLeft: 8,
        fontSize: 14,
        color: Colors.light.textSecondary,
    },

})