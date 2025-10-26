// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  initializeAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithCredential,
  updateProfile,
  sendPasswordResetEmail,
  getAuth,
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

import { app } from '../src/services/firebase';

WebBrowser.maybeCompleteAuthSession();

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (name: string, email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<string | null>;
  forgotPassword: (email: string) => Promise<string | null>;
}

// 🔽 import condicional para o submódulo (evita erro no TS e no Web)
let getReactNativePersistence: ((storage: any) => any) | undefined;
if (Platform.OS !== 'web') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  ({ getReactNativePersistence } = require('firebase/auth/react-native'));
}

// Auth: Web usa getAuth; Native usa initializeAuth + AsyncStorage
const auth =
  Platform.OS === 'web' || !getReactNativePersistence
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });

// redirectUri com scheme (configure "scheme": "reusemobile" no app.json)
const redirectUri = AuthSession.makeRedirectUri({ scheme: 'reusemobile' });

// Contexto
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [_request, response, promptAsync] = Google.useAuthRequest({
    clientId: '257764412083-ctdqj4lnip13fcdkuoonqhnnek5pdrhn.apps.googleusercontent.com',
    redirectUri,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    console.log('🔁 Redirect URI:', redirectUri);
  }, []);

  useEffect(() => {
    const authenticateWithGoogle = async () => {
      if (response?.type === 'success') {
        const { id_token } = response.params as { id_token?: string };
        if (!id_token) return;
        const credential = GoogleAuthProvider.credential(id_token);
        try {
          await signInWithCredential(auth, credential);
        } catch (err) {
          console.error('Erro ao autenticar com Google:', err);
        }
      }
    };
    authenticateWithGoogle();
  }, [response]);

  const login = async (email: string, password: string): Promise<string | null> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return null;
    } catch (err: any) {
      console.error('Erro ao logar:', err);
      return err?.message || 'Erro ao logar';
    }
  };

  const register = async (name: string, email: string, password: string): Promise<string | null> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      return null;
    } catch (err: any) {
      console.error('Erro ao registrar:', err);
      return err?.message || 'Erro ao registrar';
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
      // não faça reset('PublicFlow'); o RootNavigator troca pelo estado "user"
    } catch (err) {
      console.error('Erro ao deslogar:', err);
    }
  };

  const loginWithGoogle = async (): Promise<string | null> => {
    try {
      const result = await promptAsync();
      if (result.type !== 'success') {
        return 'Login com Google cancelado.';
      }
      return null;
    } catch (err: any) {
      console.error('Erro no login com Google:', err);
      return err?.message || 'Erro no login com Google';
    }
  };

  const forgotPassword = async (email: string): Promise<string | null> => {
    try {
      await sendPasswordResetEmail(auth, email);
      return null;
    } catch (err: any) {
      console.error('Erro ao enviar e-mail de recuperação:', err);
      return err?.message || 'Erro ao enviar e-mail de recuperação';
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, loginWithGoogle, forgotPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
