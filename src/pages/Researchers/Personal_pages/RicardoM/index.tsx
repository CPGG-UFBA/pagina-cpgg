import styles from './RicardoM.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { ResearcherEditButton } from '../../../../components/ResearcherEditButton'
import { DynamicResearcherProfile } from '../../../../components/DynamicResearcherProfile'
import earth from '../../../../assets/earth-imgur.png'

export function RicardoM() {
  return (
    <>
      <Header />
      <div>
        <div className={styles.Professor} >
          <p> Ricardo Piazza Meireles </p>
          <div className={styles.box1}>
          <DynamicResearcherProfile 
            researcherName="Ricardo Piazza Meireles"
            staticDescription="Professor e pesquisador especializado em Geologia Marinha e Costeira. Possui experiência em sedimentologia marinha, evolução costeira e oceanografia geológica. Atua principalmente em pesquisas relacionadas à dinâmica sedimentar, mudanças do nível do mar e processos costeiros."
            belowPhoto={<ResearcherEditButton researcherName="Ricardo Piazza Meireles" inline />}
          />
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/3456789012345678" target="_blank">Currículo</a>
           </nav>
           <b> e-mail</b>
           <p>ricardo@ufba.br</p> 
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