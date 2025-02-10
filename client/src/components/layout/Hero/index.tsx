import { Box } from '@mui/material'
import heroImage from '../../../assets/img/hero.jpg'

const Hero = () => {
  return (
    <Box
      sx={{
        height: '40vh',
        width: '100%',
        position: 'relative',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',  // tmavý overlay
        }
      }}
    />
  )
}

export default Hero