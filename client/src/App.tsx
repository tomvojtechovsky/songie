import { Routes, Route } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/layout/Hero'
import UserProfile from './pages/UserProfile'
import Twtest from './pages/Twtest'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%'
    }}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Container maxWidth={false} component="main" sx={{ mt: 4, mb: 4, flex: '1 0 auto' }}>
              <h1>Songie</h1>
              <p>MusicXML Generator & Player</p>
            </Container>
          </>
        } />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tailwindtest" 
          element={
              <Twtest />
          } 
        />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;