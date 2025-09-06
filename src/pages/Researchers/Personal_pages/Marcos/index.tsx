import styles from './Marcos.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import earth from '../../../../assets/earth-imgur.png'

export function Marcos() {
  return (
    <>
      <Header />
      <div>
        <div className={styles.Professor} >
          <p> Marcos Alberto Rodrigues Vasconcelos </p>
          <div className={styles.box1}>
          Possui graduação em Geologia pela Universidade Federal da Bahia (1994), mestrado em Geologia pela Universidade Federal da Bahia (1997) e doutorado em Geociências pela Universidade Federal da Bahia (2002). Atualmente é professor associado da Universidade Federal da Bahia. Tem experiência na área de Geociências, com ênfase em Geologia Estrutural, atuando principalmente nos seguintes temas: análise estrutural, tectônica, metamorfismo e evolução crustal.
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/4567890123456789" target="_blank">Currículo</a>
           </nav>
           <b> email</b>
           <p>marcos@ufba.br</p> 
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