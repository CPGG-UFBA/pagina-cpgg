import styles from './Contact.module.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import earth from '../../assets/earth-imgur.png'
import Whats from '../../assets/whatsapp-icon.png'
import type { MouseEvent } from 'react'

export function Contact() {
  const whatsappDirectUrl = 'https://wa.me/5571328385531';
  const whatsappWebUrl = 'https://web.whatsapp.com/send?phone=5571328385531';
  const handleOpenWhatsApp = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      if (window.top) {
        window.top.location.href = whatsappDirectUrl;
        return;
      }
    } catch {}
    const win = window.open(whatsappWebUrl, '_blank', 'noopener,noreferrer');
    if (!win) {
      window.location.href = whatsappWebUrl;
    }
  };
  return (
    <>
      <Header />
      <div className={styles.contact}>
          <ul> Contact us by e-mail </ul>
          <p> secretaria.cpgg.ufba@gmail.com</p>

          <div className={styles.whatsappSection}>
            <a href={whatsappDirectUrl} target="_blank" rel="noopener noreferrer" className={styles.whatsappLink} onClick={handleOpenWhatsApp} aria-label="Abrir WhatsApp">
              <img src={Whats} alt='Whatsapp' className={styles.whatsappIcon} />
              <span>Whats app us</span>
            </a>
          </div>
          <b> +55(71)3283-8531</b>
          <p className={styles.address}> R. Barão de Jeremoabo, s/n - Ondina, Salvador - BA, 40170-290</p>
          <p className={styles.building}> Bloco E- Anexo ao Instituto de Geociências</p>

          <div className={styles.staticFigure}>
            <img src={earth} alt='Terra' />
          </div>
        </div>
        
      <Footer />
    </>
  )
}
