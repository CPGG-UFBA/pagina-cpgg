import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import styles from './Laiga.module.css'

export function Laiga() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1 className={styles.title}>LAIGA</h1>
          <h2 className={styles.subtitle}>Laboratório de Investigações em Geologia Aplicada</h2>
          
          <section className={styles.section}>
            <h3>Sobre o Laboratório</h3>
            <p>
              O Laboratório de Investigações em Geologia Aplicada (LAIGA) desenvolve 
              pesquisas aplicadas em geologia, focando em soluções práticas para 
              problemas geotécnicos e ambientais.
            </p>
          </section>

          <section className={styles.section}>
            <h3>Áreas de Atuação</h3>
            <ul className={styles.servicesList}>
              <li>Geologia aplicada à engenharia</li>
              <li>Estudos geotécnicos</li>
              <li>Análise de riscos geológicos</li>
              <li>Monitoramento ambiental</li>
              <li>Caracterização de solos e rochas</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h3>Projetos de Pesquisa</h3>
            <p>
              O laboratório desenvolve projetos de pesquisa em parceria com empresas 
              e instituições, oferecendo soluções inovadoras em geologia aplicada.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}