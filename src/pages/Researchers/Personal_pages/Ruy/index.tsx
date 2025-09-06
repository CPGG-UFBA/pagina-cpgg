import styles from './Ruy.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import earth from '../../../../assets/earth-imgur.png'

export function Ruy() {
  return (
    <>
      <Header />
      <div className={styles.Ruy}>
        <div className={styles.Professor} >
          <p> Ruy Kenji Papa de Kikuchi </p>
          <div className={styles.box1}>
          Professor Titular aposentado do Instituto de Geociências da Universidade Federal da Bahia. Possui graduação em Geologia pela Universidade Federal da Bahia (1978), mestrado em Geologia pela Universidade Federal da Bahia (1982) e doutorado em Geologia Marinha pela Universidade de São Paulo (1989). Tem experiência na área de Geociências, com ênfase em Geologia e Geoquímica Marinha, atuando principalmente nos seguintes temas: geoquímica dos sedimentos, sedimentologia, oceanografia geológica, recifes de coral e corais.
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/7234567890123456" target="_blank">Currículo</a>
           </nav>
           <b> email</b>
           <p>ruy@ufba.br</p> 
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