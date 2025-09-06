import styles from './LFelipe.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import earth from '../../../../assets/earth-imgur.png'

export function LFelipe() {
  return (
    <>
      <Header />
      <div className={styles.LFelipe}>
        <div className={styles.Professor} >
          <p> Luis Felipe Ferreira de Mendonça </p>
          <div className={styles.box1}>
          Possui graduação em Oceanografia pela Universidade Federal do Rio Grande (2010), mestrado em Oceanografia pela Universidade Federal do Rio Grande (2013) e doutorado em Oceanografia pela Universidade Federal do Rio Grande (2018). Atualmente é professor adjunto da Universidade Federal da Bahia. Tem experiência na área de Oceanografia, com ênfase em Oceanografia Física, atuando principalmente nos seguintes temas: dinâmica oceânica, modelagem oceânica, correntes marinhas e interação oceano-atmosfera.
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/0123456789012345" target="_blank">Currículo</a>
           </nav>
           <b> email</b>
           <p>lfelipe@ufba.br</p> 
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