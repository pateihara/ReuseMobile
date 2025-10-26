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
    paddingBottom: 24,
  },

  divider: {
    height: 1,
    backgroundColor: (Colors.light as any).border ?? '#e9e9e9',
    marginVertical: 12,
  },

  card: {
    backgroundColor: (Colors.light as any).backgroundSecondary ?? '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.textPrimary,
    marginBottom: 6,
  },

  description: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },

  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.textPrimary,
    marginBottom: 8,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },

  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.light.textSecondary,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6 as any, // RN < 0.71 não tem gap -> pode trocar por margin/ paddings se precisar
    marginTop: 6,
    marginBottom: 8,
  },

  itemDetail: {
    fontSize: 14,
    color: Colors.light.textPrimary,
    lineHeight: 20,
    marginTop: 4,
  },

  buttonsRow: {
    marginTop: 16,
  },
});
