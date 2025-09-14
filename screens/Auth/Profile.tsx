import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import ProfileLoggedInScreen from './ProfileLoggedInScreen';
import ProfileNotLoggedInScreen from './ProfileNotLoggedInScreen';
import { Colors } from '../../src/constants/theme';

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
