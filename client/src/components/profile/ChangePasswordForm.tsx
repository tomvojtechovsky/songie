// components/profile/ChangePasswordForm.tsx
import { useState } from 'react';
import { TextField, Button, Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import config from '../../config';

const ChangePasswordForm = () => {
    const [formData, setFormData] = useState({
        current_password: '',
        new_password: '',
        confirm_password: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validace
        if (formData.new_password !== formData.confirm_password) {
            setError('Hesla se neshodují');
            return;
        }

        try {
            const response = await fetch(`${config.api.baseUrl}/auth/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    current_password: formData.current_password,
                    new_password: formData.new_password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Změna hesla selhala');
            }

            setSuccess('Heslo bylo úspěšně změněno');
            setFormData({
                current_password: '',
                new_password: '',
                confirm_password: ''
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Změna hesla selhala');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
                {error && <Alert severity="error">{error}</Alert>}
                {success && <Alert severity="success">{success}</Alert>}
                
                <TextField
                    fullWidth
                    label="Současné heslo"
                    type={showPasswords.current ? 'text' : 'password'}
                    value={formData.current_password}
                    onChange={(e) => setFormData({...formData, current_password: e.target.value})}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})}
                                    edge="end"
                                    tabIndex={-1}
                                >
                                    {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                
                <TextField
                    fullWidth
                    label="Nové heslo"
                    type={showPasswords.new ? 'text' : 'password'}
                    value={formData.new_password}
                    onChange={(e) => setFormData({...formData, new_password: e.target.value})}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})}
                                    edge="end"
                                    tabIndex={-1}
                                >
                                    {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                
                <TextField
                    fullWidth
                    label="Potvrzení nového hesla"
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={formData.confirm_password}
                    onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})}
                                    edge="end"
                                    tabIndex={-1}
                                >
                                    {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Button 
                    type="submit"
                    variant="contained"
                    sx={{ bgcolor: '#ECBD4F', color: '#333534' }}
                >
                    Změnit heslo
                </Button>
            </Stack>
        </form>
    );
};

export default ChangePasswordForm;