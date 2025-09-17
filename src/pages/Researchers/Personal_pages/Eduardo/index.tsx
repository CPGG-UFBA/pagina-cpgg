import styles from './Eduardo.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { ResearcherEditButton } from '../../../../components/ResearcherEditButton'
import { DynamicResearcherProfile } from '../../../../components/DynamicResearcherProfile'
import earth from '../../../../assets/earth-imgur.png'

export function Eduardo() {
  console.log('[Researchers] Eduardo page render');
  return (
    <div>
      <Header />
      <div>
        <div className={styles.Professor} >
          <p> Eduardo Reis Viana Rocha Junior </p>
          <div className={styles.box1}>
          <DynamicResearcherProfile 
            researcherName="Eduardo Reis Viana Rocha Junior"
            staticDescription="Possui graduação em Geologia pela Universidade Federal da Bahia (2003), mestrado em Geologia pela Universidade Federal da Bahia (2006) e doutorado em Geologia pela Universidade Federal da Bahia (2011). Atualmente é professor adjunto da Universidade Federal da Bahia. Tem experiência na área de Geociências, com ênfase em Recursos Hídricos e Ambientais, atuando principalmente nos seguintes temas: hidrogeologia, geofísica aplicada, geologia ambiental e gestão de recursos hídricos."
            belowPhoto={<ResearcherEditButton researcherName="Eduardo Reis Viana Rocha Junior" inline />}
          />
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/6789012345678901" target="_blank">Currículo</a>
           </nav>
           <b> e-mail</b>
           <p>eduardo@ufba.br</p> 
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