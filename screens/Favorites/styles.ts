import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../src/constants/theme';

const { width } = Dimensions.get('window');
const cardMargin = 8;
const numColumns = 2;
const cardWidth = (width / numColumns) - (cardMargin * 2);

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.backgroundPrimary,
    },
    listContent: {
        paddingHorizontal: cardMargin,
        paddingTop: cardMargin,
    },
    listEmpty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridRow: {
        justifyContent: 'space-between',
        marginBottom: cardMargin,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: Colors.light.textPrimary,
    },
    emptySubtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
        color: Colors.light.textSecondary,
    },
});
