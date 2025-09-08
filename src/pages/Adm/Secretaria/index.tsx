import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './secretaria.module.css'
const logocpgg = 'https://i.imgur.com/6HRTVzo.png';

export function Secretaria() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de login aqui
    console.log('Login Secretaria:', { email, password })
  }

  return (
    <div className={styles.secretaria}>
      <form className={styles.box} onSubmit={handleSubmit}>
        <div className={styles.logo}>
          <img src={logocpgg} alt="CPGG" />
        </div>
        <div className={styles.upper}>
          <p>Login - Secretaria</p>
        </div>
        <div className={styles.back}>
          <NavLink to='/adm'>← Voltar</NavLink>
        </div>
        
        <div className={styles.form}>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email"
            placeholder="Digite seu email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          
          <label htmlFor="password">Senha:</label>
          <input 
            type="password" 
            id="password"
            placeholder="Digite sua senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        
        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  )
}