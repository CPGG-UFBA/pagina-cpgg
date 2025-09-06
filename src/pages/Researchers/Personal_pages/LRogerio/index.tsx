import styles from './LRogerio.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import earth from '../../../../assets/earth-imgur.png'

export function LRogerio() {
  return (
    <>
      <Header />
      <div className={styles.LRogerio}>
        <div className={styles.Professor} >
          <p> Luiz Rogério Bastos Leal </p>
          <div className={styles.box1}>
          Possui graduação em Geologia pela Universidade Federal da Bahia (1986), mestrado em Geoquímica pela Universidade Federal Fluminense (1990) e doutorado em Geoquímica pela Universidade Federal Fluminense (1995). Atualmente é professor titular da Universidade Federal da Bahia. Tem experiência na área de Geociências, com ênfase em Geoquímica e Geocronologia, atuando principalmente nos seguintes temas: geoquímica isotópica, geocronologia, evolução crustal e recursos hídricos.
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/1234567890123456" target="_blank">Currículo</a>
           </nav>
           <b> email</b>
           <p>lrogerio@ufba.br</p> 
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