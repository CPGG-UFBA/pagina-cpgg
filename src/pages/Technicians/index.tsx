import styles from './Technicians.module.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export function Technicians() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div className={styles.technicians} style={{ flex: 1 }}>
        <div className={styles.Employees}>
          <ul>Corpo Administrativo e Técnico</ul>
          <div className={styles.techniciansGrid}>
            <div className={styles.box1}>
              <div className={styles.photobox1}></div>
              <div className={styles.Secretary}>
                <h1>Secretária Administrativa</h1>
                <a>Alcirlene Cruz da Fonseca</a>
              </div>
            </div>
            <div className={styles.box3}>
              <div className={styles.photobox3}></div>
              <div className={styles.Driver}>
                <h1>Motorista</h1>
                <a>José Mota da Paz</a>
              </div>
            </div>
            <div className={styles.box4}>
              <div className={styles.photobox4}></div>
              <div className={styles.Lab}>
                <h1>Técnico de Laboratório</h1>
                <a>Michel Nascimento da Silva</a>
              </div>
            </div>
            <div className={styles.box2}>
              <div className={styles.photobox2}></div>
              <div className={styles.TI}>
                <h1>Técnica em T.I.</h1>
                <a>Bianca Santos de Andrade</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
