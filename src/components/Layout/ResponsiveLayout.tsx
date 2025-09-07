import { ReactNode } from 'react'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { useResponsive } from '../../hooks/useResponsive'

interface ResponsiveLayoutProps {
  children: ReactNode
  className?: string
  backgroundImage?: string
  showFooter?: boolean
}

export function ResponsiveLayout({ 
  children, 
  className = '', 
  backgroundImage,
  showFooter = true 
}: ResponsiveLayoutProps) {
  const { getResponsiveValue } = useResponsive()

  const containerClasses = getResponsiveValue({
    mobile: 'min-h-screen w-full px-2 py-4',
    tablet: 'min-h-screen w-full px-4 py-6', 
    desktop: 'min-h-screen w-full px-6 py-8',
    large: 'min-h-screen w-full px-8 py-10'
  })

  const backgroundStyle = backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {}

  return (
    <div 
      className={`${containerClasses} ${className}`}
      style={backgroundStyle}
    >
      <Header />
      <main className="flex-1 relative">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )
}