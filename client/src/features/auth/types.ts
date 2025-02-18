export type User = {
    email: string;
    auth_type: 'google' | 'local';
} | null;

export type AuthContextType = {
    user: User;
    loading: boolean;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
};