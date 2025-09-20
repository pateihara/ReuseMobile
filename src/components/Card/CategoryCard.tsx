import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/theme';

interface CategoryCardProps {
title: string;
icon: React.ReactNode;
backgroundColor?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, icon, backgroundColor = '#E0E0E0' }) => {
return (
    <View style={styles.container}>
    <View style={[styles.circle, { backgroundColor }]}>
        {icon}
    </View>
    <Text style={styles.title}>{title}</Text>
    </View>
);
}

const styles = StyleSheet.create({
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

export default CategoryCard;
