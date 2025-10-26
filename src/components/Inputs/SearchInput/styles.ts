// src/components/Inputs/SearchInput/styles.ts
import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/theme";

export const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.backgroundPrimary,
    borderColor: Colors.light.border,
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 16,
    height: 48,
},
icon: {
    marginRight: 8,
},
input: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.textPrimary,
    padding: 0,
},
});
