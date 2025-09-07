import { ResponsiveLayout } from '../../../../components/Layout/ResponsiveLayout'
import { ResponsiveCard } from '../../../../components/Layout/ResponsiveCard'
import { ResponsiveText } from '../../../../components/Layout/ResponsiveText'
import { ResponsiveNavigation } from '../../../../components/Layout/ResponsiveNavigation'
import { useResponsive } from '../../../../hooks/useResponsive'
import earth from '../../../../assets/earth-imgur.png'

export function Alice() {
  console.log('[Researchers] Alice page render');
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

  const profileImageUrl = 'https://i.imgur.com/nnNDbMR.png'

  const navigationLinks = [
    { href: 'http://lattes.cnpq.br/8498244876614542', text: 'Currículo Lattes' }
  ]

  return (
    <ResponsiveLayout backgroundImage={earth}>
      <div className={containerClasses}>
        <ResponsiveCard variant="profile" backgroundImage={profileImageUrl} />
        
        <ResponsiveCard variant="content">
          <ResponsiveText variant="title" className="mb-4 text-center">
            Alice Marques Pereira Lau
          </ResponsiveText>
          
          <div className="space-y-4">
            <ResponsiveText variant="body">
              Doutora em geologia (2019). Mestre em Geociências e Meio Ambiente (2014). Bacharel em Geofísica (2011). Pesquisadora e Professora Adjunta no Instituto de Geociências da Universidade Federal da Bahia IGEO-UFBA, ministrando aulas para os cursos de geologia, engenharias e biologia. Foi professora adjunta de 2019 a 2022 na Pontifícia Universidade Católica do Rio Grande do Sul PUC-RS, onde atuou nos cursos de física com linha em geofísica, engenharias e geografia. Atua na área de geociências com ênfase em geologia, topografia e geofísica aplicada a estudos ambientais, hidrogeologia, exploração mineral e geologia de engenharia. Pesquisadora e bolsista DTI-A do CNPq em projeto de pesquisa mineral. Revisora ad hoc de periódicos científicos e membro associada da SBG e SBGf.
            </ResponsiveText>
          </div>
          
          <ResponsiveNavigation links={navigationLinks} className="mt-6" />
          
          <div className="mt-4">
            <ResponsiveText variant="subtitle" className="font-bold">
              Email:
            </ResponsiveText>
            <ResponsiveText variant="body">
              alicelau@ufba.br
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