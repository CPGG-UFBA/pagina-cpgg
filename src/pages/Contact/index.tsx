import styles from './Contact.module.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import earth from '../../assets/earth-imgur.png'
import Whats from '../../assets/whatsapp-icon.png'


export function Contact() {
  return (
    <>
      <Header />
      <div className={styles.contact}>
          <ul> Contact us by e-mail </ul>
          <p> secretaria.cpgg.ufba@gmail.com</p>

          <a> Whats app us </a>
          <b> +55(71)3283-8531</b>
          <p className={styles.address}> R. Barão de Jeremoabo, s/n - Ondina, Salvador - BA, 40170-290</p>
          <p className={styles.building}> Bloco E- Anexo ao Instituto de Geociências</p>

          <div className={styles.Whatsapp}>
            <img src={Whats} alt='Whatsapp' />
          </div>

          <div className={styles.staticFigure}>
            <img src={earth} alt='Terra' />
          </div>
        </div>
        
      <Footer />
    </>
  )
}
