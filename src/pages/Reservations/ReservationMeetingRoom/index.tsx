import styles from './ReservationMeetingRoom.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
const earth = 'https://i.imgur.com/z6pTgZ1.jpg'


export function MR() {
  return (
    <>
      <Header />
      <div className={styles.MR}>
          <ul> Reserva da Sala de Reuniões do CPGG </ul>
          <div className={styles.box}>

          <div className={styles.form}> 
             <input type="Name"   placeholder="Nome" required></input>
          </div>

          <div className={styles.form}> 
            <input type="Surname"   placeholder="Sobrenome" required></input>
          </div>


          <div className={styles.form}> 
            <input type="email"   placeholder="Eimail" required></input>
          </div>


     
        


          <div className={styles.form}> 
            <input type="use"   placeholder="Uso para...?" required></input>
          </div>

          <div className={styles.container}> 
            <div className={styles.dateField}>
               <label>Início</label>
              <input type="datetime-local"   placeholder="Starting Day"  required></input>
            </div> 
            <div className={styles.dateField}>
               <label>Término</label>
              <input type="datetime-local"   placeholder="End Day" required></input>
            </div>
          </div>

          <button className={styles.button}>
             <a href="/Reservations/Success" >
              Enviar   
             </a> 
             </button> 

          </div>

          <div className={styles.staticFigure}>
            <img src={earth} alt='Terra' />
          </div>
        </div>
        
      <Footer />
    </>
  )
}
