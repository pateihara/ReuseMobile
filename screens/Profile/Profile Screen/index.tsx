// screens/Profile/ProfileScreen/index.tsx
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import ProfileLoggedInScreen from '../ProfileLoggedIn';
import ProfileNotLoggedInScreen from '../ProfileNotLoggedIn';
import { Colors } from '../../../src/constants/theme';

const ProfileScreen: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  return user ? <ProfileLoggedInScreen /> : <ProfileNotLoggedInScreen />;
};

export default ProfileScreen;
