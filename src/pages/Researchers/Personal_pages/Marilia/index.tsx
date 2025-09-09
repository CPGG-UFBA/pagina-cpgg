import styles from './Marilia.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import earth from '../../../../assets/earth-imgur.png'

export function Marilia() {
  return (
    <>
      <Header />
      <div>
        <div className={styles.Professor} >
          <p> Marília de Dirceu Machado de Oliveira </p>
          <div className={styles.box1}>
            [Informações sobre a pesquisadora serão adicionadas aqui]
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="#" target="_blank">Currículo</a>
           </nav>
           <b> email</b>
           <p>[email será adicionado aqui]</p> 
            <div className={styles.box2}>
            </div>
          </div>
          <div className={styles.staticFigure}>
            <img src={earth} alt="Terra" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}