import styles from './blockE.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import photo1 from = 'https://imgur.com/4plf8GA'
import photo2 from ='https://imgur.com/OqJh5xS'
import photo3 from ='https://imgur.com/EqJTyBR'
import photo4 from ='https://imgur.com/aQy07JM'
import photo5 from ='https://imgur.com/DDRQSn3'
import photo6 from ='https://imgur.com/HwfW6f7'
import photo7 from ='https://imgur.com/y2jjjCx'
import photo8 from ='https://imgur.com/zxErb6w'
import photo9 from ='https://imgur.com/9KPzMqX'
import photo10 from ='https://imgur.com/JBa1Qo4'
import photo11 from ='https://imgur.com/WmRNCYV'


export function BlockE() {
  return (
    <>
      <Header />
      <div className={styles.BlockE}>
          <ul> Inauguração da Sede do CPGG (2013) </ul>
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
              <img src={photo11} alt='Foto11' />
            </div>
          </div>
          </div>
        </div>

      <Footer />
    </>
  )
}
