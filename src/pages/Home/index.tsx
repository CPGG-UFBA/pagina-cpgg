import { ResponsiveLayout } from '../../components/Layout/ResponsiveLayout';
import { ResponsiveCard } from '../../components/Layout/ResponsiveCard';
import { ResponsiveText } from '../../components/Layout/ResponsiveText';
import { useResponsive } from '../../hooks/useResponsive';
import { Middle } from './components/Middle/';
import headerBg from '../../assets/header-bg.jpg';

export function Home() {
  const { getResponsiveValue } = useResponsive()

  const heroClasses = getResponsiveValue({
    mobile: 'flex flex-col items-center justify-center min-h-96 text-center p-4 mb-8',
    tablet: 'flex flex-col items-center justify-center min-h-112 text-center p-6 mb-10',
    desktop: 'flex flex-col items-center justify-center min-h-128 text-center p-8 mb-12',
    large: 'flex flex-col items-center justify-center min-h-144 text-center p-10 mb-16'
  })

  return (
    <ResponsiveLayout backgroundImage={headerBg}>
      <section className={heroClasses}>
        <ResponsiveCard variant="content" className="bg-white/30 backdrop-blur-lg border-white/30">
          <ResponsiveText variant="title" className="text-white mb-4 font-bold">
            Centro de Pesquisa em Geofísica e Geologia
          </ResponsiveText>
          <ResponsiveText variant="subtitle" className="text-white/90">
            Excelência em pesquisa e ensino nas geociências
          </ResponsiveText>
        </ResponsiveCard>
      </section>
      
      <Middle />
    </ResponsiveLayout>
  );
}
