import { StyleSheet } from 'react-native';
import { Colors } from '../../../src/constants/theme';

export const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F5F5F5',
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.textPrimary,
    flex: 1, // Faz o texto ocupar o espaço restante
},
profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
},
text: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 20,
    color: Colors.light.textSecondary,
},
infoContainer: {
    marginBottom: 20,
},
infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
},
infoText: {
    fontSize: 16,
    color: Colors.light.textPrimary,
    fontWeight: '500',
},
});
