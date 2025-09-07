import { ReactNode } from 'react'
import { useResponsive } from '../../hooks/useResponsive'

interface ResponsiveTextProps {
  children: ReactNode
  variant?: 'title' | 'subtitle' | 'body' | 'caption'
  className?: string
  color?: string
}

export function ResponsiveText({ 
  children, 
  variant = 'body', 
  className = '',
  color = '#363F5'
}: ResponsiveTextProps) {
  const { getResponsiveValue } = useResponsive()

  const getTextClasses = () => {
    const baseClasses = 'font-roboto'
    
    switch (variant) {
      case 'title':
        return getResponsiveValue({
          mobile: `${baseClasses} text-lg font-medium`,
          tablet: `${baseClasses} text-xl font-medium`,
          desktop: `${baseClasses} text-2xl font-medium`,
          large: `${baseClasses} text-3xl font-medium`
        })
      
      case 'subtitle':
        return getResponsiveValue({
          mobile: `${baseClasses} text-sm font-medium`,
          tablet: `${baseClasses} text-base font-medium`,
          desktop: `${baseClasses} text-lg font-medium`,
          large: `${baseClasses} text-xl font-medium`
        })
      
      case 'body':
        return getResponsiveValue({
          mobile: `${baseClasses} text-xs leading-5`,
          tablet: `${baseClasses} text-sm leading-6`,
          desktop: `${baseClasses} text-base leading-7`,
          large: `${baseClasses} text-lg leading-8`
        })
      
      case 'caption':
        return getResponsiveValue({
          mobile: `${baseClasses} text-xs`,
          tablet: `${baseClasses} text-xs`,
          desktop: `${baseClasses} text-sm`,
          large: `${baseClasses} text-sm`
        })
      
      default:
        return baseClasses
    }
  }

  const textStyle = {
    color: color
  }

  return (
    <div 
      className={`${getTextClasses()} ${className}`}
      style={textStyle}
    >
      {children}
    </div>
  )
}