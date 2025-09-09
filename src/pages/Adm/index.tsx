import { NavLink } from 'react-router-dom'
import styles from './adm.module.css'
const logocpgg = 'https://i.imgur.com/6HRTVzo.png';

export function Adm() {
  return (
    <div className={styles.adm}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logocpgg} alt="CPGG" />
        </div>
        <div className={styles.title}>
          <h1>Área Administrativa</h1>
          <p>Selecione sua área de acesso:</p>
        </div>
        
        <div className={styles.optionsContainer}>
          <NavLink to="/adm/ti" className={styles.optionCard}>
            <div className={styles.cardContent}>
              <h2>TI</h2>
              <p>Acesso Tecnologia da Informação</p>
            </div>
          </NavLink>
          
          <NavLink to="/adm/secretaria" className={styles.optionCard}>
            <div className={styles.cardContent}>
              <h2>Secretária</h2>
              <p>Acesso Secretaria</p>
            </div>
          </NavLink>
          
          <NavLink to="/adm/coordenacao" className={styles.optionCard}>
            <div className={styles.cardContent}>
              <h2>Coordenação</h2>
              <p>Acesso Coordenação</p>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  )
}