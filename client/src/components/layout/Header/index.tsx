import { AppBar, Button, Toolbar, Box, Typography, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../features/auth';
import logo from '../../../assets/img/logo.png';
import LoginDialog from '../../auth/LoginDialog';  // Přidáme později
import RegistrationDialog from '../../auth/RegistrationDialog';  // Přidáme později

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [showLoginDialog, setShowLoginDialog] = useState(false);
    const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        handleClose();
        navigate('/profile');
    };

    const handleLogout = async () => {
        handleClose();
        await logout();
    };

    return (
        <>
            <AppBar position="sticky" sx={{ bgcolor: '#333534' }}>
                <Toolbar>
                    {/* Logo a název */}
                    <Box display="flex" alignItems="center">
                        <img
                            src={logo}
                            alt="Songie Logo"
                            style={{ height: '32px', marginRight: '8px' }}
                        />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                color: '#ECBD4F',
                                fontWeight: 'bold',
                                display: { xs: 'none', sm: 'block' }
                            }}
                        >
                            Songie
                        </Typography>
                    </Box>

                    {/* Mezera */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* odkaz na /tailwindtest */}
                    <Button
                        color="inherit"
                        onClick={() => navigate('/tailwindtest')}
                    >
                        Tailwind test
                    </Button>


                    {/* Mezera */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Přihlašování/UserMenu */}
                    {user ? (
                        <Box>
                            <IconButton
                                size="large"
                                onClick={handleMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: '#ECBD4F',
                                        color: '#333534'
                                    }}
                                >
                                    {user.email[0].toUpperCase()}
                                </Avatar>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        mt: 1.5,
                                        border: '1px solid rgba(0,0,0,0.1)'
                                    }
                                }}
                            >
                                <MenuItem onClick={handleProfile}>Profil</MenuItem>
                                <MenuItem onClick={handleLogout}>Odhlásit se</MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => setShowLoginDialog(true)}
                                sx={{ color: '#ECBD4F', borderColor: '#ECBD4F' }}
                            >
                                Přihlásit
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => setShowRegistrationDialog(true)}
                                sx={{ bgcolor: '#ECBD4F', color: '#333534' }}
                            >
                                Registrace
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            {/* Dialogy */}
            <LoginDialog
                open={showLoginDialog}
                onClose={() => setShowLoginDialog(false)}
            />
            <RegistrationDialog
                open={showRegistrationDialog}
                onClose={() => setShowRegistrationDialog(false)}
            />
        </>
    );
};

export default Header;