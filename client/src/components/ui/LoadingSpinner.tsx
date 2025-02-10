// components/ui/LoadingSpinner.tsx
import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => (
    <Box 
        sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '200px'
        }}
    >
        <CircularProgress sx={{ color: '#ECBD4F' }} />
    </Box>
);

export default LoadingSpinner;