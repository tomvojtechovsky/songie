import { Box, Card, CardContent, Tabs, Tab, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../features/auth';
import ChangePasswordForm from '../components/profile/ChangePasswordForm';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const UserProfile = () => {
    const [tabValue, setTabValue] = useState(0);
    const { user } = useAuth();

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
            <Card>
                <CardContent>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab label="Profil" />
                            {user?.auth_type === 'local' && <Tab label="Změna hesla" />}
                        </Tabs>
                    </Box>

                    <TabPanel value={tabValue} index={0}>
                        <Typography variant="h6" gutterBottom>
                            Informace o profilu
                        </Typography>
                        <Typography>Email: {user?.email}</Typography>
                        <Typography>Typ účtu: {user?.auth_type === 'google' ? 'Google' : 'Lokální'}</Typography>
                    </TabPanel>

                    {user?.auth_type === 'local' && (
                        <TabPanel value={tabValue} index={1}>  {/* Změna z index={2} na index={1} */}
                            <Typography variant="h6" gutterBottom>
                                Změna hesla
                            </Typography>
                            <ChangePasswordForm />
                        </TabPanel>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};

export default UserProfile;