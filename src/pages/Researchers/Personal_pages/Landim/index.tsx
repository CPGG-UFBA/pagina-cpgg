import styles from './Landim.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { ResearcherEditButton } from '../../../../components/ResearcherEditButton'
import { DynamicResearcherProfile } from '../../../../components/DynamicResearcherProfile'
import earth from '../../../../assets/earth-imgur.png'

export function Landim() {
  return (
    <>
      <Header />
      <div>
        <div className={styles.Professor} >
          <p> José Maria Dominguez Landim </p>
          <div className={styles.box1}>
          <DynamicResearcherProfile 
            researcherName="José Maria Dominguez Landim"
            staticDescription="Possui graduação em Geologia pela Universidade Federal da Bahia (1978), mestrado em Geologia pela Universidade Federal do Rio de Janeiro (1982) e doutorado em Geologia Sedimentar pela Universidade Federal da Bahia (1987). Atualmente é professor titular da Universidade Federal da Bahia. Tem experiência na área de Geociências, com ênfase em Geologia Marinha e Costeira, atuando principalmente nos seguintes temas: evolução quaternária da costa, mudanças do nível do mar, sedimentologia e estratigrafia de sequências."
            belowPhoto={<ResearcherEditButton researcherName="José Maria Dominguez Landim" inline />}
          />
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/3456789012345678" target="_blank">Currículo</a>
           </nav>
           <b> e-mail</b>
           <p>landim@ufba.br</p> 
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