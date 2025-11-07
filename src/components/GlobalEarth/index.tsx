import earth from '../../assets/earth-imgur.png'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function GlobalEarth() {
  const location = useLocation()
  const [rightPos, setRightPos] = useState('200px')
  
  useEffect(() => {
    setRightPos('200px')
  }, [])
  
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
    if (width <= 834) return '0px'
    if (width <= 1024) return '250px'
    if (width <= 1440) return '450px'
    return '500px'
  }

  const size = getSize()
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
        right: rightPos,
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