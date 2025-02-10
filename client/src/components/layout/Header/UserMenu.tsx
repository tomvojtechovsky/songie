import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../../../features/auth/authContext';  // upravená cesta k importu

const UserMenu = () => {
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleLogout = async () => {
      await logout();
      handleClose();
    };
  
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
        <IconButton
          size="large"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar 
            sx={{ width: 32, height: 32 }}
            alt={user?.name || 'User'}  // použijeme jméno uživatele
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profil</MenuItem>
          <MenuItem onClick={handleLogout}>Odhlásit</MenuItem>
        </Menu>
      </Box>
    );
  };
  
  export default UserMenu;