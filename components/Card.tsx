import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { Colors } from '../constants/theme';

interface CardProps extends ViewProps {
children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, style, ...props }) => {
return (
    <View style={[styles.card, style]} {...props}>
    {children}
    </View>
);
};

const styles = StyleSheet.create({
card: {
    backgroundColor: Colors.light.backgroundSecondary,
    borderColor: Colors.light.border,
    borderWidth: 1,
    borderRadius: 20,
    padding: 50, 
},
});

export default Card;