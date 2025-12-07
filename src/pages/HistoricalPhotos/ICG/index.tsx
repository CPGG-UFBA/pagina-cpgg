import styles from './ICG.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import { BackButtonPhotos } from '../../../components/BackButtonPhotos'
const photo1 = 'https://i.imgur.com/GMRQmEM.jpg'
const photo2 = 'https://i.imgur.com/Hg8sA0g.jpg'
const photo3 = 'https://i.imgur.com/KkqSlH1.jpg'
const photo4 = 'https://i.imgur.com/0Nf2tQE.jpg'
const photo5 = 'https://i.imgur.com/gjmaLTJ.jpg'
const photo6 = 'https://i.imgur.com/FGTHWVp.jpg'
const photo7 = 'https://i.imgur.com/HWNf8f8.jpg'
const photo8 = 'https://i.imgur.com/yGIbBgh.jpg'
const photo9 = 'https://i.imgur.com/W46neMD.jpg'
const photo10 = 'https://i.imgur.com/tMXbzTN.jpg'
const photo11 = 'https://i.imgur.com/H7TvLCM.jpg'
const photo12 = 'https://i.imgur.com/s7cxV9g.jpg'
const photo13 = 'https://i.imgur.com/WVas8pK.jpg'
const photo14 = 'https://i.imgur.com/c9iwWvW.jpg'
const photo15 = 'https://i.imgur.com/NQr6vg6.jpg'
const photo16 = 'https://i.imgur.com/v9NkL3d.jpg'
const photo17 = 'https://i.imgur.com/0cw2V45.jpg'
const photo18 = 'https://i.imgur.com/5xKHKhe.jpg'
const photo19 = 'https://i.imgur.com/36SR6Uc.jpg'
const photo20 = 'https://i.imgur.com/Zg3uGkM.jpg'
const photo21 = 'https://i.imgur.com/U2qfVQ8.jpg'
const photo22 = 'https://i.imgur.com/A6b3AMz.jpg'
const photo23 = 'https://i.imgur.com/qhh6Ate.jpg'
const photo24 = 'https://i.imgur.com/OCZ0CYH.jpg'
const photo25 = 'https://i.imgur.com/yuLLAxh.jpg'
const photo26 = 'https://i.imgur.com/mZ5etpk.jpg'
const photo27 = 'https://i.imgur.com/T4IirF7.jpg'
const photo28 = 'https://i.imgur.com/u9KTh18.jpg'
const photo29 = 'https://i.imgur.com/STlO9b5.jpg'
const photo30 = 'https://i.imgur.com/uqRbqQn.jpg'

export function ICG() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <BackButtonPhotos to="/Photos/HistoricalPhotos" />
      <div className={styles.ICG}>
          <ul> 2<sup>o</sup> Congresso Internacional de Geofísica (1991) </ul>
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
...
            <div className={styles.photo30}>
              <img src={photo30} alt='Foto30' />
            </div>
          </div>
          </div>
        </div>

      <Footer />
    </div>
  )
}
