import styles from './auditory.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { Button } from '../../../components/ui/button'
import earth from '../../../components/Figures/earth-new.jpg'

import auditory1 from '../../../assets/Photos/Auditory/Auditorio1-new.jpg'
import auditory2 from '../../../assets/Photos/Auditory/Auditorio2-new.jpg'

export function Auditory() {
  return (
    <>
      <Header />
      <div className={styles.Auditory}>
          <ul> Auditório do CPGG </ul>
          <div className={styles.box}>
            <div className={styles.gallery}>
              <div className={styles.auditory1}>
                 <img src={auditory1} alt='Foto1' />
              </div>
              <div className={styles.auditory2}>
                <img src={auditory2} alt='Foto2' />
              </div>
            </div>

          <ul> 
            O auditório do CPGG se localiza na sede do CPGG, Bloco E anexo ao Instituto 
            de Geociências da UFBA. Conta com uma estrutura para 30 pessoas,
            quadro branco, datashow, caixa de som, iluminação diferenciada,
            ar-condicionados. É utilizado para seminários, defesas de 
            final, palestras e aulas. O uso prioritário é para atividades
            do CPGG, e para atender às necessidades de seus membros. Reservas podem 
            ser feitas pelo link abaixo:

          </ul>
          <nav>
             <Button
               asChild
               variant="outline"
               className="transition-all duration-200 hover:scale-105"
             >
               <a href='/Reservations/ReservationAuditory' target="_blank" rel="noopener noreferrer">Reservar</a>
             </Button>
          </nav>
          
          </div>
          <div className={styles.staticFigure}>
            <img src={earth} alt='Terra' />
          </div>
        </div>
        
      <Footer />
    </>
  )
}
