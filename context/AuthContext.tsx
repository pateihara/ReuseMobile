import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para persistir a sessão

interface User {
id: string;
name: string;
email: string;
}

interface AuthContextType {
user: User | null;
isLoading: boolean;
login: (userData: User) => Promise<void>;
logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [user, setUser] = useState<User | null>(null);
const [isLoading, setIsLoading] = useState(true);

// Lógica para carregar a sessão do usuário do AsyncStorage
useEffect(() => {
    const loadSession = async () => {
    try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
        setUser(JSON.parse(storedUser));
        }
    } catch (error) {
        console.error('Failed to load user session', error);
    } finally {
        setIsLoading(false);
    }
    };

    loadSession();
}, []);

const login = async (userData: User) => {
    try {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    } catch (error) {
    console.error('Failed to save user session', error);
    }
};

const logout = async () => {
    try {
    await AsyncStorage.removeItem('user');
    setUser(null);
    } catch (error) {
    console.error('Failed to remove user session', error);
    }
};

return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
    {children}
    </AuthContext.Provider>
);
};

export const useAuth = () => {
const context = useContext(AuthContext);
if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
}
return context;
};