import styles from './firstmeeting.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'

import photo1 from ='https://imgur.com/lvESJHN'
import photo2 from ='https://imgur.com/QaTS5bR'
import photo3 from = 'https://imgur.com/zobqr2b'
import photo4 from = 'https://imgur.com/ANSaXpu'
import photo5 from = 'https://imgur.com/HK3MFA9'
import photo6 from ='https://imgur.com/YgBtjzG'
import photo7 from ='https://imgur.com/vaudMVm'
import photo8 from ='https://imgur.com/vaudMVm'
import photo9 from ='https://imgur.com/bUI0F8f'
import photo10 from ='https://imgur.com/8iLDZ3Z'
import photo11 from ='https://imgur.com/cFsgQ9e'
import photo12 from ='https://imgur.com/IQgebg3'
import photo13 from ='https://imgur.com/tLVri9b'
import photo14 from = 'https://imgur.com/y630kmm'
import photo15 from ='https://imgur.com/AX8qxQN'
import photo16 from ='https://imgur.com/5Hyv0FX'
import photo17 from ='https://imgur.com/dnm4jOl'
import photo18 from ='https://imgur.com/NRq0yZH'
import photo19 from ='https://imgur.com/LQXVKTW'
import photo20 from ='https://imgur.com/T4Y0ouG'
import photo21 from ='https://imgur.com/kwpibYz'
import photo22 from ='https://imgur.com/DbgG0FT'




export function FirstMeeting() {
  return (
    <>
      <Header />
      <div className={styles.FirstMeeting}>
          <ul> Primeira reunião geral de retorno do CPGG (março de 2024)</ul>
          <div className={styles.box}>
          <div className={styles.gallery}>
            <div className={styles.photo1}>
              <img src={photo1} alt='Foto1' />
            </div>
            <div className={styles.photo2}>
              <img src={photo2} alt='Foto2' />
            </div>
            <div className={styles.photo3}>
              <img src={photo3} alt='Foto3' />
            </div>
            <div className={styles.photo4}>
              <img src={photo4} alt='Foto4' />
            </div>
            <div className={styles.photo5}>
              <img src={photo5} alt='Foto5' />
            </div>
            <div className={styles.photo6}>
              <img src={photo6} alt='Foto6' />
            </div>
            <div className={styles.photo7}>
              <img src={photo7} alt='Foto7' />
            </div>
            <div className={styles.photo8}>
              <img src={photo8} alt='Foto8' />
            </div>
            <div className={styles.photo9}>
              <img src={photo9} alt='Foto9' />
            </div>
            <div className={styles.photo10}>
              <img src={photo10} alt='Foto10' />
            </div>
            <div className={styles.photo11}>
              <img src={photo11} alt='Fot11' />
            </div>
            <div className={styles.photo12}>
              <img src={photo12} alt='Foto12' />
            </div>
            <div className={styles.photo13}>
              <img src={photo13} alt='Foto13' />
            </div>
            <div className={styles.photo14}>
              <img src={photo14} alt='Foto14' />
            </div>
            <div className={styles.photo15}>
              <img src={photo15} alt='Foto15' />
            </div>
            <div className={styles.photo16}>
              <img src={photo16} alt='Foto16' />
            </div>
            <div className={styles.photo17}>
              <img src={photo17} alt='Foto17' />
            </div>
            <div className={styles.photo18}>
              <img src={photo18} alt='Foto18' />
            </div>
            <div className={styles.photo19}>
              <img src={photo19} alt='Foto19' />
            </div>
            <div className={styles.photo20}>
              <img src={photo20} alt='Foto20' />
            </div>
            <div className={styles.photo21}>
              <img src={photo21} alt='Foto21' />
            </div>
            <div className={styles.photo22}>
              <img src={photo22} alt='Foto22' />
            </div>

            
          </div>
          </div>
        </div>

      <Footer />
    </>
  )
}
