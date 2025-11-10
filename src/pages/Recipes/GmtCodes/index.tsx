import styles from './GmtCodes.module.css';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export function GmtCodes() {
  return (
    <div className={styles.pageContainer}>
      <Header/>
      <div className={styles.gmtCodes}>

        <div className={styles.container}>
          <a className={styles.card} href="https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/pseudo_res1.zip">
            <div className={styles.pseudoResistivity}>
              <h2>Pseudo-resistividade</h2>
            </div>
          </a>

          <a className={styles.card} href="https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/radargrama1.zip">
            <div className={styles.radargrama1}>
              <h2>Radargrama1</h2>
            </div>
          </a>

          <a className={styles.card} href="https://raw.githubusercontent.com/CPGG-UFBA/Documentos_WEB_CPGG/main/radargrama2.zip">
            <div className={styles.radargrama2}>
              <h2>Radargrama2</h2>
            </div>
          </a>

          <a className={styles.card} href="#">
            <div className={styles.otherCodes1}>
              <h2>Outros códigos</h2>
            </div>
          </a>

          <a className={styles.card} href="#">
            <div className={styles.otherCodes2}>
              <h2>Outros códigos</h2>
            </div>
          </a>

          <a className={styles.card} href="#">
            <div className={styles.otherCodes3}>
              <h2>Outros códigos</h2>
            </div>
          </a>
        </div>
      </div>
      <div className={styles.footerGmtCodes}>
        <Footer/>
      </div>
    </div>
  )
}
