import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import styles from './Lagep.module.css'

export function Lagep() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>LAGEP</h1>
          <h2 className={styles.subtitle}>Laboratório de Geologia e Petrologia</h2>
          
          <section className={styles.section}>
            <h3>Sobre o Laboratório</h3>
            <p>
              O Laboratório de Geologia e Petrologia (LAGEP) é dedicado ao estudo 
              das rochas e minerais, oferecendo análises especializadas em petrologia, 
              mineralogia e geoquímica.
            </p>
          </section>

          <section className={styles.section}>
            <h3>Serviços Oferecidos</h3>
            <ul className={styles.servicesList}>
              <li>Análises petrológicas</li>
              <li>Estudos mineralógicos</li>
              <li>Caracterização geoquímica</li>
              <li>Microscopia ótica</li>
              <li>Preparação de lâminas delgadas</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h3>Equipamentos</h3>
            <p>
              O laboratório conta com microscópios petrográficos, equipamentos 
              para preparação de amostras e instrumentos de análise mineral.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}