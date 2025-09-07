import styles from './contact.module.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import earth from '../../components/Figures/earth3.png'
import Whats from '../../components/Figures/Whats.png'


export function Contact() {
  return (
    <>
      <Header />
      <div className={styles.contact}>
          <ul> Contact us by e-mail </ul>
          <p> secretaria.cpgg.ufba@gmail.com</p>

          <a> Whats app us </a>
          <b> +55(71)3283-8531</b>
          <c> R. Barão de Jeremoabo, s/n - Ondina, Salvador - BA, 40170-290</c>
          <f> Bloco E- Anexo ao Instituto de Geociências</f>

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
