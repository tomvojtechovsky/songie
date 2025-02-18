import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, TextField, Divider, Typography, IconButton } from '@mui/material';
import { Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import config from '../../config';
import { useAuth } from '../../features/auth';
import { useLocation, useNavigate } from 'react-router-dom';

interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
}

interface LocationState {
    from?: {
        pathname: string;
    };
    requiresAuth?: boolean;
}

const LoginDialog = ({ open, onClose }: LoginDialogProps) => {

    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState;

    const { checkAuth } = useAuth();  // pro aktualizaci stavu přihlášení
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleGoogleLogin = () => {
        window.location.href = `${config.api.baseUrl}${config.api.endpoints.auth.googleLogin}`;
    };

    const handleSuccessfulLogin = () => {
        // Pokud přicházíme z /profile, přesměrujeme na home page
        const from = state?.from?.pathname;
        if (from === '/profile') {
            navigate('/');
        } else {
            navigate(from || '/');
        }
        onClose();
    };

    const handleLocalLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.auth.localLogin}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Přihlášení selhalo');
            }

            // Aktualizujeme auth stav
            await checkAuth();

            handleSuccessfulLogin();

            // Zavřeme dialog
            onClose();
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Přihlášení selhalo');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Přihlášení</DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{ mt: 2 }}>
                    {/* Lokální přihlášení */}
                    <form onSubmit={handleLocalLogin}>
                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!error}
                            />
                            <TextField
                                fullWidth
                                label="Heslo"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!error}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            tabIndex={-1}  // Toto způsobí, že tlačítko bude ignorováno při procházení pomocí Tab
                                            aria-label={showPassword ? "Skrýt heslo" : "Zobrazit heslo"}  // Pro screen readery
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                            />
                            {error && (
                                <Typography color="error" variant="body2">
                                    {error}
                                </Typography>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ bgcolor: '#ECBD4F', color: '#333534' }}
                            >
                                Přihlásit
                            </Button>
                        </Stack>
                    </form>

                    {/* Oddělovač */}
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Divider sx={{ flex: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                            nebo
                        </Typography>
                        <Divider sx={{ flex: 1 }} />
                    </Stack>

                    {/* Google přihlášení */}
                    <Button
                        variant="outlined"
                        startIcon={<Google />}
                        onClick={handleGoogleLogin}
                        fullWidth
                    >
                        Přihlásit přes Google
                    </Button>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Zavřít</Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginDialog;