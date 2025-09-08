import styles from './Regulations.module.css';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import cpggLogo from '../../assets/cpgg-logo.jpg'

export  function Regulations() {
  return (
      <>
      <Header/>
          <div className={styles.regulations}>
              <h1 className={styles.title}>Regimento e Normas </h1>

              <div className={styles.container}>
                  <a className={styles.card} href="https://drive.google.com/file/d/1lKeG0fAc_HzBDP-C8WaaBIM5vOhVurBB/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                      <div className={styles.regulation}>
                          <h2>Regimento</h2>
                      </div>
                  </a>

                  <a className={styles.card} href="https://drive.google.com/file/d/1gYKCWZw-1Io5FCGRtjPKBZNoWDKnMAmE/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                      <div className={styles.accreditation}>
                          <h2> Deliberação Normativa para (re)credenciamento</h2>
                      </div>
                  </a>
                  <a className={styles.card} href="https://drive.google.com/file/d/1lNFAxiARsoaADdfVeagH3Dcn3DpYR0w2/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                      <div className={styles.senior}>
                          <h2> Deliberação Normativa para pesquisadores seniores</h2>
                      </div>
                  </a>

                  
              </div>
                <div className={styles.staticFigure}>
                     <img src={cpggLogo} alt='Logo CPGG' />
                 </div>
          </div>
          <Footer/>
      </>
  )
}