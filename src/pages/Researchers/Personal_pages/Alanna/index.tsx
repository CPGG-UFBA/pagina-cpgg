import styles from './Alanna.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import { ResearcherEditButton } from '../../../../components/ResearcherEditButton'
import { DynamicResearcherProfile } from '../../../../components/DynamicResearcherProfile'
import earth from '../../../../assets/earth-imgur.png'

export function Alanna() {
  console.log('[Researchers] Alanna page render');
  
  const staticDescription = "Graduada em Física pela Universidade Estadual de Santa Cruz, mestrado e doutorado em Geofísica pela Universidade de São Paulo, Brasil. Trabalha na Universidade Federal da Bahia Profª. do Departamento de Física da Terra e Meio Ambiente no Instituto de Física, Programa de Pós-Graduação em Geofísica e Centro de Pesquisa em Geofísica e Geologia da UFBA, no Instituto de Geociências. Desenvolve pesquisas envolvendo temas relacionados à Modelagem e Inversão de dados geofísicos, Métodos Potenciais, Eletromagnético, Gamaespectrométrico e estudo em Geotermia da Litosfera."
  
  return (
    <>
      <Header />
      <div>
        <div className={styles.Professor} >
          <p> Alanna Costa Dutra </p>
          <div className={styles.box1}>
            <DynamicResearcherProfile 
              researcherName="Alanna Costa Dutra"
              staticDescription={staticDescription}
              belowPhoto={<ResearcherEditButton researcherName="Alanna Costa Dutra" inline />}
            />
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href='http://lattes.cnpq.br/9954455880450271' target="_blank">Currículo</a>
           </nav>
           <b> e-mail</b>
           <p>alannacd@ufba.br</p> 
            <div className={styles.box2}>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}
