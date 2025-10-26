// screens/UserReview/FeedbackUserReview/styles.ts
import { StyleSheet } from 'react-native';
import { Colors } from '../../../src/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundPrimary,
  },
  content: {
    padding: 16,
  },
  card: {
    padding: 24,
  },

  // Títulos e textos
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: Colors.light.textSecondary,
    marginBottom: 12,
    textAlign: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.textPrimary,
    marginBottom: 12,
  },

  // Separador
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: 16,
    opacity: 0.6,
  },

  // Avaliação (estrelas)
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  ratingText: {
    marginLeft: 8,
    color: Colors.light.textPrimary,
    fontWeight: '600',
  },

  // Localização e detalhes
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  itemDetail: {
    color: Colors.light.textPrimary,
    fontSize: 15,
  },

  // Botões
  buttonsRow: {
    marginTop: 16,
  },
});
