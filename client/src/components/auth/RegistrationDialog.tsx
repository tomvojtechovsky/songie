import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, TextField, Divider, Typography, InputAdornment, IconButton, Snackbar, Alert } from '@mui/material';
import { Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import config from '../../config';

interface RegistrationDialogProps {
    open: boolean;
    onClose: () => void;
}

const RegistrationDialog = ({ open, onClose }: RegistrationDialogProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Validační stavy
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleGoogleRegistration = () => {
        window.location.href = `${config.api.baseUrl}${config.api.endpoints.auth.googleLogin}`;
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            email: '',
            password: '',
            confirmPassword: ''
        };



        // Validace emailu
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            newErrors.email = 'Email je povinný';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Neplatný formát emailu';
            isValid = false;
        }

        // Validace hesla
        if (!password) {
            newErrors.password = 'Heslo je povinné';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Heslo musí mít alespoň 6 znaků';
            isValid = false;
        }

        // Validace potvrzení hesla
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Potvrzení hesla je povinné';
            isValid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Hesla se neshodují';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });

    const handleLocalRegistration = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.auth.register}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',  // Přidáno
                    body: JSON.stringify({
                        email,
                        password
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.detail || 'Registration failed');
                }

                setSnackbar({
                    open: true,
                    message: 'Registrace proběhla úspěšně. Prosím zkontrolujte svůj email.',
                    severity: 'success'
                });

                // Zavřeme dialog po úspěšné registraci
                setTimeout(() => {
                    onClose();
                }, 2000);

            } catch (error) {
                setSnackbar({
                    open: true,
                    message: error instanceof Error ? error.message : 'Registrace selhala',
                    severity: 'error'
                });
            }
        }
    };

    const handleSnackbarClose = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>Registrace</DialogTitle>
                <DialogContent>
                    <Stack spacing={3} sx={{ mt: 2 }}>
                        {/* Lokální registrace */}
                        <form onSubmit={handleLocalRegistration}>
                            <Stack spacing={2}>

                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                                <TextField
                                    fullWidth
                                    label="Heslo"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    tabIndex={-1}  // Toto způsobí, že tlačítko bude ignorováno při procházení pomocí Tab
                                                    aria-label={showPassword ? "Skrýt heslo" : "Zobrazit heslo"}  // Pro screen readery
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Potvrzení hesla"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    edge="end"
                                                    tabIndex={-1} 
                                                    aria-label={showConfirmPassword ? "Skrýt heslo" : "Zobrazit heslo"}  // Pro screen readery

                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{ bgcolor: '#ECBD4F', color: '#333534' }}
                                >
                                    Registrovat
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

                        {/* Google registrace */}
                        <Button
                            variant="outlined"
                            startIcon={<Google />}
                            onClick={handleGoogleRegistration}
                            fullWidth
                        >
                            Registrovat přes Google
                        </Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Zavřít</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </>
    );
};

export default RegistrationDialog;