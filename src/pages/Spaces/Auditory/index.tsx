import styles from './auditory.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import earth from '../../../components/Figures/earth3.png'

import auditory1 from = 'https://imgur.com/6OUQmS1'
import auditory2 from = 'https://imgur.com/tA75GHg'

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
             <a href='/Reservations/ReservationAuditory' target="_blank">Reservar</a>
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
