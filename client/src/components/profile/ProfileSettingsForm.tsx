import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../../features/auth/authContext';

const ProfileSettingsForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implementovat aktualizaci profilu
    console.log('Update profile:', formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Jméno"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3 }}
      >
        Uložit změny
      </Button>
    </Box>
  );
};

export default ProfileSettingsForm;