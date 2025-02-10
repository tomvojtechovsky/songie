import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../../services/api/auth';

// Definice typu pro uživatele
type User = {
    email: string;
    name: string;
    auth_type: 'google' | 'local';  // přidáme auth_type
  } | null;
  
  type AuthContextType = {
    user: User;
    loading: boolean;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
  };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const userData = await authService.checkAuth();
            setUser(userData);
        } catch (error) {
            console.error('Auth check failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, checkAuth, logout }}>
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