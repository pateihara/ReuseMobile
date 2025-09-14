import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import ProfileLoggedInScreen from './Auth/ProfileLoggedInScreen';
import ProfileNotLoggedInScreen from './Auth/ProfileNotLoggedInScreen';
import { Colors } from '../src/constants/theme';

const ProfileScreen: React.FC = () => {
const { user, isLoading } = useAuth();

if (isLoading) {
return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color={Colors.light.primary} />
    </View>
);
}

return user ? <ProfileLoggedInScreen /> : <ProfileNotLoggedInScreen />;
};

export default ProfileScreen;