import styles from './middle.module.css'
import earth from '../../../../components/Figures/earth3.png'

import figure1 from '../../../../components/Figures/news1.png'
import figure2 from '../../../../components/Figures/news2.png'
import figure3 from '../../../../components/Figures/news3.png'

export function Middle() {
  return (
    <main className={styles.middle}>
        <ul> Clique sobre a notícia para mais detalhes</ul>
      <div className={styles.News}>
        <div className={styles.NewsTrack}>
          <div className={styles.slide}>
            <a href='/News/News1'>
              <img src={figure1}></img>
            </a> 
          </div>

          <div className={styles.slide}>
            <a href='/News/News2'>
              <img src={figure2}></img>
            </a> 
          </div>

          <div className={styles.slide}>
            <a href='/News/News3'>
              <img src={figure3}></img>
            </a> 
          </div>

          <div className={styles.slide}>
            <a href='/News/News1'>
              <img src={figure1}></img>
            </a> 
          </div>

          <div className={styles.slide}>
            <a href='/News/News2'>
              <img src={figure2}></img>
            </a> 
          </div>

          <div className={styles.slide}>
            <a href='/News/News3'>
              <img src={figure3}></img>
            </a> 
          </div>

        </div>
      </div>

      <div className={styles.static}>
        <strong>Earth</strong>
        <h1>is our Goal</h1>
        <div className={styles.enjoy}>
          <h1>Enjoy our best solutions for </h1>
          <strong>scientific</strong>
          <h1>and trade proposals</h1>
        </div>
      </div>
      <div className={styles.staticFigure}>
        <img src={earth} alt='Terra' />
      </div>
    </main>
  )
}