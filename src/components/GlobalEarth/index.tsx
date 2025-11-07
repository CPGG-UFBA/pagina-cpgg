import earth from '../../assets/earth-imgur.png'
import { useLocation } from 'react-router-dom'

export function GlobalEarth() {
  const location = useLocation()
  
  // Hide on specific pages
  const hideOnRoutes = [
    '/researchers', 
    '/Researchers',
    '/technicians', 
    '/Technicians', 
    '/coordination', 
    '/Coordination',
    '/history',
    '/History',
    '/history/Former',
    '/History/Former',
    '/Map',
    '/map',
    '/production',
    '/Production',
    '/News/News1',
    '/News/News2',
    '/News/News3'
  ]
  
  // Also hide on photo subpages (but not /Photos root or /Photos/HistoricalPhotos root)
  const isPhotoSubPage = (location.pathname.includes('/Photos/') || 
                         location.pathname.includes('/photos/')) &&
                         location.pathname !== '/Photos/HistoricalPhotos'
  
  const shouldHide = hideOnRoutes.includes(location.pathname) || isPhotoSubPage
  
  if (shouldHide) {
    return null
  }
  
  // Calculate size based on screen width
  const getSize = () => {
    const width = window.innerWidth
    if (width <= 834) return '0px' // Hide on small screens
    if (width <= 1024) return '250px' // Half size
    if (width <= 1440) return '450px' // -50px from original
    return '500px' // Default size for screens larger than 1440px
  }

  // Calculate right position - moved 50px to the left
  const getRightPosition = () => {
    const width = window.innerWidth
    if (width <= 834) return '100px'
    if (width <= 1024) return '100px'
    if (width <= 1440) return '100px'
    return '100px' // 50px to the left from original 150px
  }

  const size = getSize()
  const rightPosition = getRightPosition()
  const shouldHideOnSmallScreen = window.innerWidth <= 834

  if (shouldHideOnSmallScreen) {
    return null
  }

  return (
    <div 
      className="global-earth-container"
      style={{
        position: 'fixed',
        top: '215px',
        right: rightPosition,
        zIndex: 1,
        width: size,
        height: size,
        display: 'block',
        visibility: 'visible',
        pointerEvents: 'none'
      }}
    >
      <img 
        src={earth} 
        alt='Terra Global CPGG' 
        className="global-earth-image"
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          borderRadius: '50%',
          margin: 0,
          padding: 0,
          display: 'block',
          maxWidth: 'none',
          maxHeight: 'none'
        }}
      />
    </div>
  )
}