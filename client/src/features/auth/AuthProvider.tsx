import { useState, useEffect } from 'react';
import { authService } from '../../services/api/auth';
import { User } from './types';
import { AuthContext } from './context';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const userData = await authService.checkAuth();
            setUser(userData);
        } catch (error) {
            setUser(null);
            if (error instanceof Error && error.message !== 'Auth check failed') {
                console.error('Unexpected auth error:', error);
            }
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