import { Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import config from '../../../config';

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = `${config.api.baseUrl}${config.api.endpoints.auth.googleLogin}`;
  };

  return (
    <Button
      variant="contained"
      onClick={handleLogin}
      startIcon={<Google />}
      sx={{
        bgcolor: '#ECBD4F',
        color: '#333534',
        '&:hover': {
          bgcolor: '#d4a73c'
        }
      }}
    >
      Přihlásit
    </Button>
  );
};

export default LoginButton;