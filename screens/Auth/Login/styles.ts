// screens/Auth/Login/styles.ts
import { StyleSheet } from 'react-native';
import { Colors } from '../../../src/constants/theme';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  forgotPassword: {
    alignItems: 'center',
    marginVertical: 8,
  },
  linkText: {
    color: Colors.light.secondary,
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  socialContainer: {
    marginTop: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 4,
  },
});
