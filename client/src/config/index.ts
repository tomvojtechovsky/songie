const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    endpoints: {
      auth: {
        me: '/auth/me',
        googleLogin: '/auth/google/login',    // upraveno
        googleCallback: '/auth/google/callback', // přidáno
        localLogin: '/auth/login',            // přidáno pro lokální přihlášení
        register: '/auth/register',           // přidáno pro registraci
        logout: '/auth/logout',
        verifyEmail: '/auth/verify'           // přidáno pro verifikaci
      }
    }
  }
} as const;

export default config;