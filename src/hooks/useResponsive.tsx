import { useState, useEffect } from 'react'

export interface BreakpointConfig {
  mobile: number
  tablet: number
  desktop: number
  large: number
}

const defaultBreakpoints: BreakpointConfig = {
  mobile: 640,
  tablet: 768, 
  desktop: 1024,
  large: 1280
}

export function useResponsive(breakpoints: BreakpointConfig = defaultBreakpoints) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowSize.width < breakpoints.mobile
  const isTablet = windowSize.width >= breakpoints.mobile && windowSize.width < breakpoints.desktop
  const isDesktop = windowSize.width >= breakpoints.desktop && windowSize.width < breakpoints.large
  const isLarge = windowSize.width >= breakpoints.large

  const getResponsiveValue = <T,>(values: {
    mobile: T
    tablet?: T
    desktop?: T
    large?: T
  }): T => {
    if (isMobile) return values.mobile
    if (isTablet) return values.tablet || values.mobile
    if (isDesktop) return values.desktop || values.tablet || values.mobile
    return values.large || values.desktop || values.tablet || values.mobile
  }

  return {
    windowSize,
    isMobile,
    isTablet, 
    isDesktop,
    isLarge,
    getResponsiveValue,
    breakpoint: isMobile ? 'mobile' : isTablet ? 'tablet' : isDesktop ? 'desktop' : 'large'
  }
}