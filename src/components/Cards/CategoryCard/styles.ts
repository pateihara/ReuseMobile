import { StyleSheet } from "react-native";
import { Colors } from '../../../constants/theme'

export const styles = StyleSheet.create({
container: {
    alignItems: 'center',
    marginRight: 16,
},
circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
},
title: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.light.textPrimary,
},
});
