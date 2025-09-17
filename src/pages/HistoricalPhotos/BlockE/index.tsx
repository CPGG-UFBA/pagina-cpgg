import styles from './blockE.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
const photo1 = 'https://i.imgur.com/4plf8GA.jpg'
const photo2 = 'https://i.imgur.com/OqJh5xS.jpg'
const photo3 = 'https://i.imgur.com/EqJTyBR.jpg'
const photo4 = 'https://i.imgur.com/aQy07JM.jpg'
const photo5 = 'https://i.imgur.com/DDRQSn3.jpg'
const photo6 = 'https://i.imgur.com/HwfW6f7.jpg'
const photo7 = 'https://i.imgur.com/y2jjjCx.jpg'
const photo8 = 'https://i.imgur.com/zxErb6w.jpg'
const photo9 = 'https://i.imgur.com/9KPzMqX.jpg'
const photo10 = 'https://i.imgur.com/JBa1Qo4.jpg'
const photo11 = 'https://i.imgur.com/WmRNCYV.jpg'


export function BlockE() {
  return (
    <div className={styles.pageContainer}>
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
    </div>
  )
}
