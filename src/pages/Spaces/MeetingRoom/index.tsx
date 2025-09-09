import styles from './meetingroom.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { Button } from '../../../components/ui/button'
import earth from '../../../components/Figures/earth-new.jpg'

import meeting1 from '../../../assets/Photos/Meetingroom/Meetings1-new.jpg'
import meeting2 from '../../../assets/Photos/Meetingroom/Meetings2-new.jpg'

export function MeetingRoom() {
  return (
    <>
      <Header />
      <div className={styles.MeetingRoom}>
          <ul> Sala de Reuniões do CPGG </ul>
          <div className={styles.box}>
            <div className={styles.gallery}>
              <div className={styles.meetingroom1}>
                 <img src={meeting1} alt='Foto1' />
              </div>
              <div className={styles.meetingroom2}>
                <img src={meeting2} alt='Foto2' />
              </div>
            </div>

          <ul> 
            A sala de reuniões do CPGG fica localizada na sala 163 da sede do CPGG, Bloco E, anexo ao Instituto de Geociências da UFBA. Tem um amplo espaço de 25 m<sup>2</sup> com uma mesa central 
            quadrada e assentos para 20 pessoas. Conta com quadro branco, datashow,
            ar-condicionado. O uso prioritário é para atividades
            do CPGG, e para atender às necessidades de seus membros. Reservas podem 
            ser feitas pelo link abaixo:

          </ul>
          <nav>
             <Button 
               variant="outline" 
               className="border-white text-white hover:bg-white hover:text-primary transition-all duration-300"
               onClick={() => window.open('/Reservations/ReservationMeetingRoom', '_blank')}
             >
               Reservar
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
