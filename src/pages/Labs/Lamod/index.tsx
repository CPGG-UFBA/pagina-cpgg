import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import styles from './Lamod.module.css'

export function Lamod() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>LAMOD</h1>
          <h2 className={styles.subtitle}>Laboratório de Modelagem</h2>
          
          <section className={styles.section}>
            <h3>Sobre o Laboratório</h3>
            <p>
              O Laboratório de Modelagem (LAMOD) é especializado em modelagem 
              computacional e simulações numéricas aplicadas às geociências, 
              desenvolvendo modelos para diversos processos geológicos.
            </p>
          </section>

          <section className={styles.section}>
            <h3>Especialidades</h3>
            <ul className={styles.servicesList}>
              <li>Modelagem geológica 3D</li>
              <li>Simulações numéricas</li>
              <li>Análise de bacias sedimentares</li>
              <li>Modelagem de reservatórios</li>
              <li>Processamento de dados geofísicos</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h3>Recursos Computacionais</h3>
            <p>
              O laboratório possui infraestrutura computacional avançada com 
              softwares especializados em modelagem geológica e processamento 
              de grandes volumes de dados.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}