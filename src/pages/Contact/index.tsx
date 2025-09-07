import styles from './Contact.module.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import earth from '../../assets/earth-imgur.png'
import Whats from '../../assets/whatsapp-icon.png'

export function Contact() {
  const phoneNumber = '+55(71)3283-8531'
  const whatsappNumber = '5571328385531'
  
  return (
    <>
      <Header />
      <div className={styles.contact}>
        <ul> Contact us by e-mail </ul>
        <p> secretaria.cpgg.ufba@gmail.com</p>

        <div className={styles.whatsappSection}>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappLink}
            aria-label="Abrir WhatsApp"
          >
            <img src={Whats} alt="Whatsapp" className={styles.whatsappIcon} />
            <span>Whats app us</span>
          </a>
        </div>

        <b> {phoneNumber}</b>
        <p className={styles.address}> R. Barão de Jeremoabo, s/n - Ondina, Salvador - BA, 40170-290</p>
        <p className={styles.building}> Bloco E- Anexo ao Instituto de Geociências</p>

        <div className={styles.staticFigure}>
          <img src={earth} alt="Terra" />
        </div>
      </div>

      <Footer />
    </>
  )
}
