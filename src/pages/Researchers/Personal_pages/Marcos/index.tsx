import { ResponsiveLayout } from '../../../../components/Layout/ResponsiveLayout'
import { ResponsiveCard } from '../../../../components/Layout/ResponsiveCard'
import { ResponsiveText } from '../../../../components/Layout/ResponsiveText'
import { ResponsiveNavigation } from '../../../../components/Layout/ResponsiveNavigation'
import { useResponsive } from '../../../../hooks/useResponsive'
import earth from '../../../../assets/earth-imgur.png'
import staticFigure from '../../../../components/Figures/static-figure.png'

export function Marcos() {
  console.log('[Researchers] Marcos page render');
  const { getResponsiveValue } = useResponsive()

  const imageClasses = getResponsiveValue({
    mobile: 'w-40 h-40 object-contain mx-auto mt-4',
    tablet: 'w-48 h-48 object-contain mx-auto mt-6',
    desktop: 'w-64 h-64 object-contain absolute bottom-0 right-8',
    large: 'w-80 h-80 object-contain absolute bottom-0 right-12'
  })

  const containerClasses = getResponsiveValue({
    mobile: 'flex flex-col min-h-screen relative p-4',
    tablet: 'flex flex-col min-h-screen relative p-6',
    desktop: 'flex flex-col min-h-screen relative p-8',
    large: 'flex flex-col min-h-screen relative p-10'
  })

  const profileImageUrl = 'https://i.imgur.com/ba3ItpJ.png'

  const navigationLinks = [
    { href: 'http://lattes.cnpq.br/4567890123456789', text: 'Currículo Lattes' }
  ]

  return (
    <ResponsiveLayout backgroundImage={earth}>
      <div className={containerClasses}>
        <ResponsiveCard variant="profile" backgroundImage={profileImageUrl}>
          {/* Profile photo will be displayed as background */}
        </ResponsiveCard>
        
        <ResponsiveCard variant="content">
          <ResponsiveText variant="title" className="mb-4 text-center">
            Marcos Alberto Rodrigues Vasconcelos
          </ResponsiveText>
          
          <div className="space-y-4">
            <ResponsiveText variant="body">
              Possui graduação em Geologia pela Universidade Federal da Bahia (1994), mestrado em Geologia pela Universidade Federal da Bahia (1997) e doutorado em Geociências pela Universidade Federal da Bahia (2002). Atualmente é professor associado da Universidade Federal da Bahia. Tem experiência na área de Geociências, com ênfase em Geologia Estrutural, atuando principalmente nos seguintes temas: análise estrutural, tectônica, metamorfismo e evolução crustal.
            </ResponsiveText>
          </div>
          
          <ResponsiveNavigation links={navigationLinks} className="mt-6" />
          
          <div className="mt-4">
            <ResponsiveText variant="subtitle" className="font-bold">
              Email:
            </ResponsiveText>
            <ResponsiveText variant="body">
              marcos@ufba.br
            </ResponsiveText>
          </div>
        </ResponsiveCard>
        
        <img 
          src={earth} 
          alt="Terra" 
          className={imageClasses}
        />
      </div>
    </ResponsiveLayout>
  )
}