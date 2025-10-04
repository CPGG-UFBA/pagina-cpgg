import styles from './calendars.module.css';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { useNavigate } from 'react-router-dom';


export  function Calendars() {
  const navigate = useNavigate();

  return (
      <>
      <Header/>
          <div className={styles.calendars}>
              <button 
                onClick={() => navigate('/recipes')}
                className={styles.backButton}
                aria-label="Voltar para Receitas"
              >
                ← Voltar
              </button>
              <h1 className={styles.title}>Receitas </h1>

              <div className={styles.container}>
                  <div className={styles.buttonsGrid}>
                      <a className={styles.card} href="https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/cal2025.pdf" target="_blank" rel="noopener noreferrer">
                          <div className={`${styles.calendarCard} ${styles.calendar2025}`}>
                              <h2>Calendário de 2025</h2>
                          </div>
                      </a>

                      <a className={styles.card} href="https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/cal2024.pdf" target="_blank" rel="noopener noreferrer">
                          <div className={`${styles.calendarCard} ${styles.calendar2024}`}>
                              <h2>Calendário de 2024</h2>
                          </div>
                      </a>
                      
                      <a className={styles.card} href="https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/cal2023.pdf" target="_blank" rel="noopener noreferrer">
                          <div className={`${styles.calendarCard} ${styles.calendar2023}`}>
                              <h2>Calendário de 2023</h2>
                          </div>
                      </a>
                      
                      <a className={styles.card} href="https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/cal2022.pdf" target="_blank" rel="noopener noreferrer">
                          <div className={`${styles.calendarCard} ${styles.calendar2022}`}>
                              <h2>Calendário de 2022</h2>
                          </div>
                      </a>
                      
                      <a className={styles.card} href="https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/cal2021.pdf" target="_blank" rel="noopener noreferrer">
                          <div className={`${styles.calendarCard} ${styles.calendar2021}`}>
                              <h2>Calendário de 2021</h2>
                          </div>
                      </a>
                      
                      <a className={styles.card} href="https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/cal2020.pdf" target="_blank" rel="noopener noreferrer">
                          <div className={`${styles.calendarCard} ${styles.calendar2020}`}>
                              <h2>Calendário de 2020</h2>
                          </div>
                      </a>
                  </div>
                  
                  <div className={styles.earthContainer}>
                      <img 
                          src="https://i.imgur.com/z6pTgZ1.jpg" 
                          alt="Terra" 
                          className={styles.earthImage}
                      />
                  </div>
              </div>
          </div>
          <div className={styles.footerCalendars}>
            <Footer/>
          </div>
      </>
  )
}