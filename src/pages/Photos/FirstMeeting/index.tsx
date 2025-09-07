import styles from './firstmeeting.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'

import photo1 from '../../../assets/Photos/FirstMeeting/Foto1.png'
import photo2 from '../../../assets/Photos/FirstMeeting/Foto2.png'
import photo3 from '../../../assets/Photos/FirstMeeting/Foto3.png'
import photo4 from '../../../assets/Photos/FirstMeeting/Foto4.png'
import photo5 from '../../../assets/Photos/FirstMeeting/Foto5.png'
import photo6 from '../../../assets/Photos/FirstMeeting/Foto6.png'
import photo7 from '../../../assets/Photos/FirstMeeting/Foto7.png'
import photo8 from '../../../assets/Photos/FirstMeeting/Foto8.png'
import photo9 from '../../../assets/Photos/FirstMeeting/Foto9.png'
import photo10 from '../../../assets/Photos/FirstMeeting/Foto10.png'
import photo11 from '../../../assets/Photos/FirstMeeting/Foto11.png'
import photo12 from '../../../assets/Photos/FirstMeeting/Foto12.png'
import photo13 from '../../../assets/Photos/FirstMeeting/Foto13.png'
import photo14 from '../../../assets/Photos/FirstMeeting/Foto14.png'
import photo15 from '../../../assets/Photos/FirstMeeting/Foto15.png'
import photo16 from '../../../assets/Photos/FirstMeeting/Foto16.png'
import photo17 from '../../../assets/Photos/FirstMeeting/Foto17.png'
import photo18 from '../../../assets/Photos/FirstMeeting/Foto18.png'
import photo19 from '../../../assets/Photos/FirstMeeting/Foto19.png'
import photo20 from '../../../assets/Photos/FirstMeeting/Foto20.png'
import photo21 from '../../../assets/Photos/FirstMeeting/Foto21.png'
import photo22 from '../../../assets/Photos/FirstMeeting/Foto22.png'
import photo23 from '../../../assets/Photos/FirstMeeting/Foto23.png'
import photo24 from '../../../assets/Photos/FirstMeeting/Foto24.png'



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
            <div className={styles.photo23}>
              <img src={photo23} alt='Foto23' />
            </div>
            <div className={styles.photo24}>
              <img src={photo24} alt='Foto24' />
            </div>
            
          </div>
          </div>
        </div>

      <Footer />
    </>
  )
}
