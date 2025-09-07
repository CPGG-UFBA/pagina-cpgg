import { useResponsive } from '../../hooks/useResponsive'

interface ResponsiveNavigationProps {
  links: Array<{
    href: string
    text: string
  }>
  className?: string
}

export function ResponsiveNavigation({ links, className = '' }: ResponsiveNavigationProps) {
  const { getResponsiveValue } = useResponsive()

  const navClasses = getResponsiveValue({
    mobile: 'flex flex-col gap-2 text-xs',
    tablet: 'flex flex-wrap gap-3 text-sm',
    desktop: 'flex gap-4 text-sm',
    large: 'flex gap-6 text-base'
  })

  const linkClasses = getResponsiveValue({
    mobile: 'text-white hover:text-purple-300 transition-colors duration-200 py-1',
    tablet: 'text-white hover:text-purple-300 transition-colors duration-200 py-1 px-2',
    desktop: 'text-white hover:text-purple-300 transition-colors duration-200 py-1 px-3',
    large: 'text-white hover:text-purple-300 transition-colors duration-200 py-2 px-4'
  })

  return (
    <nav className={`${navClasses} ${className}`}>
      {links.map((link, index) => (
        <a 
          key={index}
          href={link.href}
          className={linkClasses}
        >
          {link.text}
        </a>
      ))}
    </nav>
  )
}