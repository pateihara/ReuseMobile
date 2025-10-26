// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  initializeAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  updateProfile,
  sendPasswordResetEmail,
  User,
} from 'firebase/auth';
import * as Auth from 'firebase/auth'; // 👈 vamos pegar o helper daqui via "as any"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
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

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// ✅ Persistência com AsyncStorage (resolve o WARN do Firebase)
const auth = initializeAuth(app, {
  persistence: (Auth as any).getReactNativePersistence(AsyncStorage),
});
// Redirect URI (usado no login com Google)
const redirectUri = AuthSession.makeRedirectUri();

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
    const go = async () => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(auth, credential);
      }
    };
    go();
  }, [response]);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return null;
    } catch (e: any) {
      return e?.message ?? 'Erro ao logar';
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) await updateProfile(auth.currentUser, { displayName: name });
      return null;
    } catch (e: any) {
      return e?.message ?? 'Erro ao registrar';
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const loginWithGoogle = async () => {
    try {
      const result = await promptAsync();
      if (result.type !== 'success') return 'Login com Google cancelado.';
      return null;
    } catch (e: any) {
      return e?.message ?? 'Erro no login com Google';
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return null;
    } catch (e: any) {
      return e?.message ?? 'Erro ao enviar e-mail de recuperação';
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
