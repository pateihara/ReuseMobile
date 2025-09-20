import { StyleSheet } from 'react-native';
import { Colors } from '../../../src/constants/theme';

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.backgroundPrimary },
    content: { padding: 16 },
    card: { padding: 24, zIndex: 1000 },
    stepTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8, color: Colors.light.textSecondary },
    question: { fontSize: 20, fontWeight: 'bold', marginBottom: 4, marginTop: 20, color: Colors.light.textPrimary },
    description: { fontSize: 15, color: Colors.light.textSecondary, marginBottom: 12 },
    input: { borderWidth: 1, borderColor: Colors.light.border, borderRadius: 6, padding: 12, fontSize: 16, marginTop: 10 },
    optionButton: { flexDirection: 'row', alignItems: 'center', padding: 8 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', padding: 16 },
    footerButton: { flex: 1, marginHorizontal: 4 }, // A margem foi ajustada
    dropdown: { borderColor: Colors.light.border },
    dropdownContainer: { marginTop: 20, marginBottom: 16 },
    dropdownListContainer: { borderColor: Colors.light.border },
    cameraContainer: { flexDirection: 'column', alignItems: 'center', marginTop: 20 },
    cameraButton: {
        width: 120,
        height: 120,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: Colors.light.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraButtonText: {
        marginTop: 8,
        color: Colors.light.primary,
        fontSize: 14,
    },
    imagePreviewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
    },
    imagePreview: {
        width: 80,
        height: 80,
        borderRadius: 6,
        margin: 4,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
    locationContainer: {
        marginTop: 20,
    },
    locationButton: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 8,
        padding: 20,
        backgroundColor: Colors.light.backgroundSecondary,
    },
    locationButtonText: {
        marginTop: 8,
        color: Colors.light.primary,
        fontSize: 16,
    },
    locationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.light.textPrimary,
    },
    manualEntryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
        color: Colors.light.textPrimary,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    inputHalf: {
        width: '48%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.backgroundPrimary,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: Colors.light.textSecondary,
    },
});