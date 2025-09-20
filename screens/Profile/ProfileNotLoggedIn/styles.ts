import { StyleSheet } from 'react-native';
import { Colors } from '../../../src/constants/theme';

export const styles = StyleSheet.create({
background: {
    flex: 1,
    width: '100%',
    height: '100%',
},
    container: {
    flex: 1,
    backgroundColor: 'transparent', // Fundo branco com opacidade
},
content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
},
card: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderRadius: 8,
    padding: 32,
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: Colors.light.textPrimary,
},
text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.light.textSecondary,
},
spacer: {
    height: 10,
},
});
