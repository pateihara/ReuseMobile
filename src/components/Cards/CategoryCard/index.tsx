import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

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

export default CategoryCard;
