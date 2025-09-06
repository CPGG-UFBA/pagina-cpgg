import { NavLink } from 'react-router-dom'
import styles from './sign.module.css'
const logocpgg = 'https://imgur.com/6HRTVzo.png';


export function Sign() {
  return (
      <div className={styles.sign}>
        <form className={styles.box}>
          <div className={styles.logo}>
            <img src={logocpgg}  alt="CPGG" />
          </div>
          <div className={styles.upper}>
            <p> Create an account</p>
          </div>
          <div className={styles.already}>
            <p> Already have any account?</p>
          </div> 
          <div className={styles.login}>
              <li>
            <NavLink to='/login'> Log in </NavLink>
              </li>
          </div>
          
          <h1> Enter your email address to create an account </h1>
          <input type="email"   placeholder="Email address" required></input>
          
          <button className={styles.button}>
             <a href="/register" >
              Create an account   
             </a> 
             </button> 
      </form>
     
    </div> 
  )
}