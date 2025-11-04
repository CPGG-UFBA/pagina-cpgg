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
  
  return (
    <div 
      className="global-earth-container"
      style={{
        position: 'fixed !important' as any,
        top: '215px !important' as any,
        right: '50px !important' as any,
        zIndex: '1 !important' as any,
        width: '500px !important' as any,
        height: '500px !important' as any,
        display: 'block !important' as any,
        visibility: 'visible !important' as any,
        pointerEvents: 'none !important' as any
      }}
    >
      <img 
        src={earth} 
        alt='Terra Global CPGG' 
        className="global-earth-image"
        style={{
          width: '500px !important' as any,
          height: '500px !important' as any,
          objectFit: 'contain !important' as any,
          borderRadius: '50% !important' as any,
          margin: '0 !important' as any,
          padding: '0 !important' as any,
          display: 'block !important' as any,
          maxWidth: 'none !important' as any,
          maxHeight: 'none !important' as any
        }}
      />
    </div>
  )
}