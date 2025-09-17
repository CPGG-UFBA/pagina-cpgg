import styles from './Jailma.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { ResearcherEditButton } from '../../../../components/ResearcherEditButton'
import { DynamicResearcherProfile } from '../../../../components/DynamicResearcherProfile'
import earth from '../../../../assets/earth-imgur.png'

export function Jailma() {
  return (
    <div>
      <Header />
      <div>
        <div className={styles.Professor} >
          <p> Jailma Santos de Souza de Oliveira </p>
          <div className={styles.box1}>
          <DynamicResearcherProfile 
            researcherName="Jailma Santos de Souza de Oliveira"
            staticDescription="Possui graduação em Geologia pela Universidade Federal da Bahia (1995), mestrado em Geologia pela Universidade Federal da Bahia (1998) e doutorado em Geologia pela Universidade Federal da Bahia (2002). Atualmente é professora associada da Universidade Federal da Bahia. Tem experiência na área de Geociências, com ênfase em Geologia, atuando principalmente nos seguintes temas: geoquímica, petrologia metamórfica, geocronologia e evolução crustal."
            belowPhoto={<ResearcherEditButton researcherName="Jailma Santos de Souza de Oliveira" inline />}
          />
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/2345678901234567" target="_blank">Currículo</a>
           </nav>
           <b> e-mail</b>
           <p>jailma@ufba.br</p> 
            <div className={styles.box2}>
            </div>
          </div>
          <div className={styles.staticFigure}>
            <img src={earth} alt="Terra" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}