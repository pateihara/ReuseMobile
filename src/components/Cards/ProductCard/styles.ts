import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/theme";

export const styles = StyleSheet.create({
card: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    padding: 16,
    width: 180,  
    backgroundColor: Colors.light.backgroundSecondary,
    marginBottom: 16
},
image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover'
},
title: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
description: { fontSize: 14, color: Colors.light.textSecondary, marginBottom: 8 },
statusContainer: { paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4, alignSelf: 'flex-start' },
statusText: { color: Colors.light.backgroundSecondary, fontSize: 12, fontWeight: 'bold' }
});
