import styles from './Haroldo.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { ResearcherEditButton } from '../../../../components/ResearcherEditButton'
import { DynamicResearcherProfile } from '../../../../components/DynamicResearcherProfile'
import earth from '../../../../assets/earth-imgur.png'

export function Haroldo() {
  return (
    <>
      <Header />
      <div>
        <div className={styles.Professor} >
          <p> José Haroldo da Silva Sá </p>
          <div className={styles.box1}>
          <DynamicResearcherProfile 
            researcherName="José Haroldo da Silva Sá"
            staticDescription="Possui graduação em Geologia pela Universidade Federal da Bahia (1975), mestrado em Geologia pela Universidade Federal da Bahia (1980) e doutorado em Geologia pela Universidade Federal da Bahia (1993). Atualmente é professor titular da Universidade Federal da Bahia. Tem experiência na área de Geociências, com ênfase em Petrologia, atuando principalmente nos seguintes temas: petrologia metamórfica, evolução crustal, geocronologia e geoquímica isotópica."
            belowPhoto={<ResearcherEditButton researcherName="José Haroldo da Silva Sá" inline />}
          />
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/7890123456789012" target="_blank">Currículo</a>
           </nav>
           <b> email</b>
           <p>haroldo@ufba.br</p> 
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