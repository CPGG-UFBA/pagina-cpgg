import styles from './regulations.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import earth from '../../components/Figures/earth3.png'

export  function Regulations() {
  return (
      <>
      <Header/>
          <div className={styles.regulations}>
              <h1 className={styles.title}>Regimento e Normas </h1>

              <div className={styles.container}>
                  <a className={styles.card} href="/src/assets/PDF/Regimento.pdf" target="_blank" rel="noopener noreferrer">
                      <div className={styles.regulation}>
                          <h2>Regimento</h2>
                      </div>
                  </a>

                  <a className={styles.card} href="/src/assets/PDF/Deliberacao_normativa_1_2023.pdf" target="_blank" rel="noopener noreferrer">
                      <div className={styles.accreditation}>
                          <h2> Deliberação Normativa para (re)credenciamento</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="/src/assets/PDF/Deliberacao_normativa_2_2023.pdf" target="_blank" rel="noopener noreferrer">
                      <div className={styles.senior}>
                          <h2> Deliberação Normativa para pesquisadores seniores</h2>
                      </div>
                  </a>

                  
              </div>
              <div className={styles.staticFigure}>
                    <img src={earth} alt='Terra' />
                 </div>
          </div>
          <Footer/>
      </>
  )
}