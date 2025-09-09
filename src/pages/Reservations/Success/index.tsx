import styles from './Success.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
const earth = 'https://imgur.com/z6pTgZ1'


export function Success() {
  return (
    <>
      <Header />
      <div className={styles.success}>
          <ul> Your request has been succesfully submitted </ul>
          <p> Our secretary will soonly confirm it by email </p>


          <div className={styles.staticFigure}>
            <img src={earth} alt='Terra' />
          </div>
        </div>
        
      <Footer />
    </>
  )
}
