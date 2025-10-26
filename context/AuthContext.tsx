import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
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
const auth = getAuth(app);

// Se tiver scheme no app.json, pode usar: AuthSession.makeRedirectUri({ scheme: 'seuapp' })
const redirectUri = AuthSession.makeRedirectUri();

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Google Auth
  const [_request, response, promptAsync] = Google.useAuthRequest({
    clientId: '257764412083-ctdqj4lnip13fcdkuoonqhnnek5pdrhn.apps.googleusercontent.com',
    redirectUri,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      (async () => {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        try {
          await signInWithCredential(auth, credential);
        } catch (error) {
          console.error('Erro ao autenticar com Google:', error);
        }
      })();
    }
  }, [response]);

  const login = async (email: string, password: string): Promise<string | null> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return null;
    } catch (error: any) {
      console.error('Erro ao logar:', error);
      return error.message || 'Erro ao logar';
    }
  };

  const register = async (name: string, email: string, password: string): Promise<string | null> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      return null;
    } catch (error: any) {
      console.error('Erro ao registrar:', error);
      return error.message || 'Erro ao registrar';
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  const loginWithGoogle = async (): Promise<string | null> => {
    try {
      const result = await promptAsync();
      if (result.type !== 'success') return 'Login com Google cancelado.';
      return null;
    } catch (error: any) {
      console.error('Erro no login com Google:', error);
      return error.message || 'Erro no login com Google';
    }
  };

  const forgotPassword = async (email: string): Promise<string | null> => {
    try {
      await sendPasswordResetEmail(auth, email);
      return null;
    } catch (error: any) {
      console.error('Erro ao enviar e-mail de recuperação:', error);
      return error.message || 'Erro ao enviar e-mail de recuperação';
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
