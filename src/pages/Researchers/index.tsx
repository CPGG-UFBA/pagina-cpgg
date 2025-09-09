import styles from './Researchers.module.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Link } from 'react-router-dom'
import { getOrderedResearchersData } from '../../data/researchers'

export function Researchers() {
  const { oil, environment, mineral, oceanography, coast } = getOrderedResearchersData()

  return (
    <>
      <Header />
      <div className={`${styles.researchers} hide-earth`}>
        <div className={styles.Programs}>
          <ul>Programas de Pesquisa e Corpo Científico </ul>
          <div className={styles.box}>
            <div className={styles.Oil}>
              <h1>Exploração de Petróleo</h1>
              {oil.map((r) => (
                <nav key={r.route}><Link to={r.route}> {r.name}</Link></nav>
              ))}
            </div>
            
            <div className={styles.Environment}> 
              <h1>Recursos Hidricos e Ambientais</h1>
              {environment.map((r) => (
                <nav key={r.route}><Link to={r.route}> {r.name}</Link></nav>
              ))}
            </div>

            <div className={styles.Mineral}>
              <h1> Petrologia, Metalogênese e Exp. Mineral</h1>
              {mineral.map((r) => (
                <nav key={r.route}><Link to={r.route}> {r.name}</Link></nav>
              ))}
            </div>

            <div className={styles.Oceanography}> 
              <h1>Oceanografia Física</h1>
              {oceanography.map((r) => (
                <nav key={r.route}><Link to={r.route}> {r.name}</Link></nav>
              ))}
            </div>

            <div className={styles.Coast}> 
              <h1>Geologia Marinha e Costeira</h1>
              {coast.map((r) => (
                <nav key={r.route}><Link to={r.route}> {r.name}</Link></nav>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
