import styles from './blockE.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
const photo1 = 'https://imgur.com/4plf8GA'
const photo2 = 'https://imgur.com/OqJh5xS'
const photo3 = 'https://imgur.com/EqJTyBR'
const photo4 = 'https://imgur.com/aQy07JM'
const photo5 = 'https://imgur.com/DDRQSn3'
const photo6 = 'https://imgur.com/HwfW6f7'
const photo7 = 'https://imgur.com/y2jjjCx'
const photo8 = 'https://imgur.com/zxErb6w'
const photo9 = 'https://imgur.com/9KPzMqX'
const photo10 = 'https://imgur.com/JBa1Qo4'
const photo11 = 'https://imgur.com/WmRNCYV'


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
