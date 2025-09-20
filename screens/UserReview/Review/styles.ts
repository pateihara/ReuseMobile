import { StyleSheet } from 'react-native';
import { Colors } from '../../../src/constants/theme';

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.light.backgroundPrimary },
    content: { padding: 16 },
    card: { padding: 24, zIndex: 1000 },

    stepTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
        color: Colors.light.textSecondary
    },
    question: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        marginTop: 20,
        color: Colors.light.textPrimary
    },
    description: {
        fontSize: 15,
        color: Colors.light.textSecondary,
        marginBottom: 12
    },

    // Input de comentário
    input: {
        borderWidth: 1,
        borderColor: Colors.light.border,
        borderRadius: 6,
        padding: 12,
        fontSize: 16,
        marginTop: 10,
        textAlignVertical: 'top',
        minHeight: 100
    },

    // Estrelas de avaliação
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20
    },

    // Botões do rodapé
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16
    },
    footerButton: {
        flex: 1,
        marginHorizontal: 4
    },

    // Fotos
    cameraContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20
    },
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
        justifyContent: 'center',
    },
    imagePreview: {
        width: 80,
        height: 80,
        borderRadius: 6,
        margin: 4,
        borderWidth: 1,
        borderColor: Colors.light.border,
    },
});
