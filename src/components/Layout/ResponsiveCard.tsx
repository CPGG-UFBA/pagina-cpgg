import { ReactNode } from 'react'
import { useResponsive } from '../../hooks/useResponsive'

interface ResponsiveCardProps {
  children?: ReactNode
  className?: string
  variant?: 'profile' | 'content' | 'image'
  backgroundImage?: string
}

export function ResponsiveCard({ 
  children, 
  className = '', 
  variant = 'content',
  backgroundImage 
}: ResponsiveCardProps) {
  const { getResponsiveValue } = useResponsive()

  const getCardClasses = () => {
    const baseClasses = 'border-2 border-white/20 bg-white/20 backdrop-blur-sm rounded-3xl'
    
    switch (variant) {
      case 'profile':
        return getResponsiveValue({
          mobile: `${baseClasses} w-32 h-32 p-2 mx-auto mb-4`,
          tablet: `${baseClasses} w-40 h-40 p-3 mx-auto mb-6`,
          desktop: `${baseClasses} w-48 h-48 p-4 absolute top-8 left-4`,
          large: `${baseClasses} w-56 h-56 p-4 absolute top-12 left-8`
        })
      
      case 'content':
        return getResponsiveValue({
          mobile: `${baseClasses} w-full max-w-sm mx-auto p-4 mt-4`,
          tablet: `${baseClasses} w-full max-w-2xl mx-auto p-6 mt-6`,
          desktop: `${baseClasses} w-full max-w-4xl mx-auto p-8 mt-8`,
          large: `${baseClasses} w-full max-w-6xl mx-auto p-10 mt-12`
        })
      
      case 'image':
        return getResponsiveValue({
          mobile: `${baseClasses} w-20 h-20 p-2`,
          tablet: `${baseClasses} w-24 h-24 p-2`,
          desktop: `${baseClasses} w-32 h-32 p-3`,
          large: `${baseClasses} w-36 h-36 p-3`
        })
      
      default:
        return baseClasses
    }
  }

  const backgroundStyle = backgroundImage ? {
    backgroundImage: `linear-gradient(90deg, rgba(2,0,36,0.1) 0%, rgba(63,9,121,0.1)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {}

  return (
    <div 
      className={`${getCardClasses()} ${className}`}
      style={backgroundStyle}
    >
      {children}
    </div>
  )
}