import styles from './Edson.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import earth from '../../../../assets/earth-imgur.png'

export function Edson() {
  return (
    <>
      <Header />
      <div className={styles.Edson}>
        <div className={styles.Professor} >
          <p> Edson Emanuel Starteri Sampaio </p>
          <div className={styles.box1}>
          Possui graduação em Geologia pela Universidade Federal da Bahia (2006), mestrado em Geologia pela Universidade Federal da Bahia (2009) e doutorado em Geologia pela Universidade Federal da Bahia (2014). Atualmente é professor adjunto da Universidade Federal da Bahia. Tem experiência na área de Geociências, com ênfase em Petrologia, Metalogênese e Exploração Mineral, atuando principalmente nos seguintes temas: petrogênese, geocronologia, geoquímica isotópica e geologia estrutural.
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/1234567890123456" target="_blank">Currículo</a>
           </nav>
           <b> email</b>
           <p>edson@ufba.br</p> 
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