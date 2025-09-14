import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../constants/theme';

type FeedbackType = 'success' | 'error' | 'warning';

interface FeedbackProps {
type: FeedbackType;
message: string;
}

const Feedback: React.FC<FeedbackProps> = ({ type, message }) => {
let iconName = '';
let iconColor = '';
let backgroundColor = '';

switch (type) {
    case 'success':
    iconName = 'checkmark-circle-outline';
    iconColor = Colors.light.success;
    backgroundColor = Colors.light.backgroundSuccess;
    break;
    case 'error':
    iconName = 'close-circle-outline';
    iconColor = Colors.light.error;
    backgroundColor = Colors.light.backgroundError;
    break;
    case 'warning':
    iconName = 'alert-circle-outline';
    iconColor = Colors.light.attention;
    backgroundColor = Colors.light.backgroundAttention;
    break;
}

return (
    <View style={[styles.container, { backgroundColor }]}>
    <Ionicons name={iconName} size={24} color={iconColor} style={styles.icon} />
    <Text style={[styles.message, { color: iconColor }]}>{message}</Text>
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: Colors.light.attention,
},
icon: {
    marginRight: 10,
},
message: {
    fontSize: 16,
    flex: 1,
},
});

export default Feedback;
