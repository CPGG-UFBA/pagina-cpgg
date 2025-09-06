import styles from './Arthur.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import earth from '../../../../assets/earth-imgur.png'

export function Arthur() {
  return (
    <>
      <Header />
      <div className={styles.Arthur}>
        <div className={styles.Professor} >
          <p> Arthur Antônio Machado</p>
          <div className={styles.box1}>
          Possui graduação em Oceanologia pela Universidade Federal do Rio Grande (2005), mestrado em Ecologia pela Universidade Federal do Rio Grande do Norte (2007) e doutorado em Oceanografia Física, Química e Geológica pela Universidade Federal do Rio Grande (2014). Professor Adjunto na UFBA. Atualmente coordenador do curso de Oceanografia da UFBA. Tem experiência na área de Oceanografia, com ênfase em Oceanografia Geológica, atuando principalmente nos seguintes temas: Sismoestratigrafia, Estratigrafia de Sequências, Morfodinâmica Costeira e Oceânica, Interação Oceano-Atmosfera, Geofísica Marinha, Ilhas Oceânicas e Mergulho Científico.
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/0995930862317550" target="_blank">Currículo</a>
           </nav>
           <b> email</b>
           <p>arthur.machado@ufba.br</p> 
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