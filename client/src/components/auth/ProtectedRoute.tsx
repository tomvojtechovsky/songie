// components/auth/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/authContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import { Snackbar, Alert } from '@mui/material';
import { useState, useEffect } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            setShowNotification(true);
        }
    }, [loading, user]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return (
            <>
                <Navigate 
                    to="/" 
                    replace 
                    state={{ from: location, requiresAuth: true }} 
                />
                <Snackbar
                    open={showNotification}
                    autoHideDuration={6000}
                    onClose={() => setShowNotification(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert 
                        severity="warning" 
                        onClose={() => setShowNotification(false)}
                    >
                        Pro přístup k této stránce se musíte přihlásit
                    </Alert>
                </Snackbar>
            </>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;