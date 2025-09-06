import styles from './MZucchi.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import earth from '../../../../assets/earth-imgur.png'

export function MZucchi() {
  return (
    <>
      <Header />
      <div>
        <div className={styles.Professor} >
          <p> Maria do Rosário Zucchi </p>
          <div className={styles.box1}>
          Possui graduação em Geologia pela Universidade Federal da Bahia (1982), mestrado em Geologia pela Universidade Federal da Bahia (1986) e doutorado em Geologia pela Universidade Federal da Bahia (1993). Atualmente é professora associada da Universidade Federal da Bahia. Tem experiência na área de Geociências, com ênfase em Recursos Hídricos e Ambientais, atuando principalmente nos seguintes temas: hidrogeologia, geologia ambiental, geofísica aplicada e gestão de recursos naturais.
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/2345678901234567" target="_blank">Currículo</a>
           </nav>
           <b> email</b>
           <p>mzucchi@ufba.br</p> 
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