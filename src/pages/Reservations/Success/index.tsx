import styles from './Success.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'


export function Success() {
  return (
    <>
      <Header />
      <div className={styles.success}>
          <ul> Solicitação de Reserva Enviada com Sucesso! </ul>
          <p> A secretária do CPGG entrará em contato em breve por e-mail para confirmar sua reserva. </p>
        </div>
        
      <Footer />
    </>
  )
}
