import styles from './Success.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
const earth = 'https://imgur.com/z6pTgZ1'


export function Success() {
  return (
    <>
      <Header />
      <div className={styles.success}>
          <ul> Solicitação de Reserva Enviada com Sucesso! </ul>
          <p> A secretária do CPGG entrará em contato em breve por e-mail para confirmar sua reserva. </p>


          <div className={styles.staticFigure}>
            <img src={earth} alt='Terra' />
          </div>
        </div>
        
      <Footer />
    </>
  )
}
