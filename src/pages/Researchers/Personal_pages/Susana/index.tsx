import styles from './Susana.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { ResearcherEditButton } from '../../../../components/ResearcherEditButton'
import { DynamicResearcherProfile } from '../../../../components/DynamicResearcherProfile'
import earth from '../../../../assets/earth-imgur.png'

export function Susana() {
  return (
    <>
      <Header />
      <div>
        <div className={styles.Professor} >
          <p> Susana Silva Cavalcanti </p>
          <div className={styles.box1}>
          <DynamicResearcherProfile 
            researcherName="Susana Silva Cavalcanti"
            staticDescription="Possui doutorado em Geofísica pela Universidade Federal da Bahia (2006) e mestrado em Geofísica pela Universidade Federal da Bahia (1999). É graduada em Engenharia Sanitária e em Engenharia Civil, possui experiência profissional na área ambiental e em projetos de Sistemas de Abastecimento de Água. Atualmente é professora Associada IV e pesquisadora no Instituto de Geociências da UFBA, atuando principalmente nos seguintes temas: Geofísica de Exploração de Águas Subterrâneas e Geofísica Aplicada a Estudos Ambientais, Métodos Geofísicos Elétricos e Gestão de Resíduos Sólidos e de Recursos Hídricos."
            belowPhoto={<ResearcherEditButton researcherName="Susana Silva Cavalcanti" inline />}
          />
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/3712697556346790" target="_blank">Currículo</a>
           </nav>
           <b> email</b>
           <p>scavalcanti@ufba.br</p> 
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