import { Box, Container, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#333534',
        color: 'white'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Songie. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer