// src/components/Inputs/TextInput/styles.ts
import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/theme";

export const styles = StyleSheet.create({
container: {
    gap: 8,
},
label: {
    color: Colors.light.textPrimary,
    fontSize: 16,
},
description: {
    color: Colors.light.textSecondary,
    fontSize: 16,
},
input: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderColor: Colors.light.border,
    borderWidth: 1,
    borderRadius: 8,
    color: Colors.light.textSecondary,
    padding: 16,
    fontSize: 16,
},
});
