import styles from './Joelson.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { ResearcherEditButton } from '../../../../components/ResearcherEditButton'
import { DynamicResearcherProfile } from '../../../../components/DynamicResearcherProfile'
import { BackButton } from '../../../../components/BackButton'

export function Joelson() {
  return (
    <div className={styles.Container}>
      <Header />
      <div>
        <div className={styles.Professor} >
          <BackButton />
          <p> Joelson da Conceição Batista </p>
          <div className={styles.box1}>
          <DynamicResearcherProfile 
            researcherName="Joelson da Conceição Batista"
            staticDescription="Possui graduação em Geofísica pela Universidade Federal da Bahia (1993), mestrado em Geofísica pela Universidade Federal da Bahia (1998) e doutorado em Geofísica pela Universidade Federal da Bahia (2004). Atualmente é professor associado da Universidade Federal da Bahia. Tem experiência na área de Geociências, com ênfase em Geofísica, atuando principalmente nos seguintes temas: métodos potenciais, processamento de dados geofísicos, exploração de petróleo e modelagem geofísica."
            belowPhoto={<ResearcherEditButton researcherName="Joelson da Conceição Batista" inline />}
          />
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/8901234567890123" target="_blank">Currículo</a>
           </nav>
           <b> e-mail</b>
           <p>joelson@ufba.br</p> 
            <div className={styles.box2}>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}