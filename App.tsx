import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import RootNavigator from './navigation/RootNavigation';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;