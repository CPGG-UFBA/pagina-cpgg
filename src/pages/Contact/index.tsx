import whatsappIcon from "../../components/Figures/whatsapp-icon.png";
import contactFigure from "../../components/Figures/contact-figure.png";
import styles from './Contact.module.css';

export function Contact() {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* Contact List */}
        <ul className={styles.title}>
          <li>Contatos</li>
        </ul>

        {/* Contact Information */}
        <p className={styles.description}>
          Entre em contato conosco:
        </p>

        {/* Phone/Email Link */}
        <a 
          href="mailto:cpgg@ufba.br" 
          className={styles.emailLink}
        >
          cpgg@ufba.br
        </a>

        <div className={styles.address}>
          Rua Barão de Jeremoabo, S/N - Ondina
        </div>

        <div className={styles.phone}>
          Tel: (71) 3283-8500/8501
        </div>

        <div className={styles.cep}>
          Salvador - Bahia - CEP: 40170-110
        </div>

        <div className={styles.whatsappContainer}>
          <a 
            href="https://web.whatsapp.com/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              src={whatsappIcon} 
              alt="WhatsApp" 
              className={styles.whatsappIcon}
            />
          </a>
        </div>

        <div className={styles.imageContainer}>
          <img 
            src={contactFigure} 
            alt="Contact" 
            className={styles.contactImage}
          />
        </div>
      </div>
    </div>
  )
}