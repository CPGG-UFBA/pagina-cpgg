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
    '/History/Former'
  ]
  
  // Also hide on all researcher personal pages and photo subpages (but not /Photos root)
  const isResearcherPage = location.pathname.includes('/researchers/') || 
                          location.pathname.includes('/Researchers/')
  const isPhotoSubPage = location.pathname.includes('/Photos/') || 
                        location.pathname.includes('/photos/')
  
  const shouldHide = hideOnRoutes.includes(location.pathname) || isResearcherPage || isPhotoSubPage
  
  if (shouldHide) {
    return null
  }
  
  return (
    <div 
      className="global-earth-container"
      style={{
        position: 'fixed !important' as any,
        top: '135px !important' as any,
        left: 'calc(50% + 500px) !important' as any,
        transform: 'translateX(-50%) !important' as any,
        zIndex: '99999 !important' as any,
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