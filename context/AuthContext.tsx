import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<string | null>;
    register: (name: string, email: string, password: string) => Promise<string | null>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('@loggedUser');
                if (storedUser) setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Erro ao carregar usuário logado:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadUser();
    }, []);

    // Validação simples
    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    // Cadastro → salva o usuário em uma lista
    const register = async (name: string, email: string, password: string) => {
        if (name.trim().length < 3) return "O nome deve ter pelo menos 3 caracteres.";
        if (!isValidEmail(email)) return "Email inválido.";
        if (password.length < 7) return "A senha deve ter pelo menos 7 caracteres.";

        const storedUsers = await AsyncStorage.getItem('@users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        // Evita emails duplicados
        if (users.some((u: User) => u.email === email)) {
            return "Este email já está cadastrado.";
        }

        const newUser: User = { id: Date.now().toString(), name, email, password };
        users.push(newUser);

        await AsyncStorage.setItem('@users', JSON.stringify(users));
        await AsyncStorage.setItem('@loggedUser', JSON.stringify(newUser));

        setUser(newUser);
        return null;
    };

    //  Login → só funciona se já existir cadastro
    const login = async (email: string, password: string) => {
        if (!isValidEmail(email)) return "Email inválido.";
        if (password.length < 7) return "A senha deve ter pelo menos 7 caracteres.";

        const storedUsers = await AsyncStorage.getItem('@users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const existingUser = users.find(
            (u: User) => u.email === email && u.password === password
        );

        if (!existingUser) return "Usuário ou senha incorretos.";

        await AsyncStorage.setItem('@loggedUser', JSON.stringify(existingUser));
        setUser(existingUser);
        return null;
    };

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem('@loggedUser');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
    return context;
};
