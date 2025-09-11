import styles from './Wilson.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { ResearcherEditButton } from '../../../../components/ResearcherEditButton'
import { DynamicResearcherProfile } from '../../../../components/DynamicResearcherProfile'
import earth from '../../../../assets/earth-imgur.png'

export function Wilson() {
  return (
    <>
      <Header />
      <ResearcherEditButton researcherName="Wilson Mouzer Figueiró" />
      <div>
        <div className={styles.Professor} >
          <p> Wilson Mouzer Figueiró </p>
          <div className={styles.box1}>
          <DynamicResearcherProfile 
            researcherName="Wilson Mouzer Figueiró"
            staticDescription="Possui Graduação em Matemática pela Universidade Federal do Rio de Janeiro (1983) e Doutorado em Geofísica pela UFBA, Universidade Federal da Bahia, (1994). Realizou Pesquisa a nível de Pós-Doutorado no Departamento Terra-Atmosfera-Oceano da Escola Normal Superior de Paris na França (1997-1999). Atualmente é Professor Associado da UFBA e Pesquisador do Centro de Pesquisa em Geofísica e Geologia da UFBA. Tem experiência na área de Geociências, com ênfase em Inversão Geofísica, atuando principalmente nos seguintes temas: Inversão Sísmica, Modelagem Sísmica, Traçamento de Raios Sísmicos, e Matemática Aplicada à Geofísica."
          />
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/4503597230743925" target="_blank">Currículo</a>
           </nav>
           <b> email</b>
           <p>figueiro6@gmail.com</p> 
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