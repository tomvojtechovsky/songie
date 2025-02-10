import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implementovat změnu hesla
    console.log('Change password:', formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        type="password"
        label="Současné heslo"
        value={formData.currentPassword}
        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        type="password"
        label="Nové heslo"
        value={formData.newPassword}
        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
        margin="normal"
      />
      <TextField
        fullWidth
        type="password"
        label="Potvrzení nového hesla"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3 }}
      >
        Změnit heslo
      </Button>
    </Box>
  );
};

export default ChangePasswordForm;