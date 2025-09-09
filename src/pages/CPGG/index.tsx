import styles from './CPGG.module.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import earth from '../../components/Figures/earth-new.jpg'
import { getTotalResearchersCount } from '../../data/researchers'

export function CPGG() {
  const totalResearchers = getTotalResearchersCount()
  
  return (
    <>
      <Header />
      <div className={styles.cpgg}>
        <div className={styles.Title} >
          <ul> O CPGG </ul>
          <div className={styles.box}>
          <p>
              O Centro de Pesquisa em Geofísica e Geologia (CPGG/UFBA) é um órgão complementar
              da UFBA vinculado aos Institutos de Geociências e de Física através da Resolução nº 02/2011 do 
              Conselho Universitário. Foi reestruturado em março de 1997 visando, sobretudo, institucionalizar e suceder o Programa de Pesquisa e Pós-Graduação em Geofísica da Universidade Federal da Bahia (PPPG/UFBA), criado no ano de 1969 pelo prof. Carlos Alberto Dias. Tem como filosofia desenvolver programas interdisciplinares de pesquisa científica, assim
              como, fomentar o desenvolvimento da qualificação pessoal. 
            </p>
            <br></br>
            <p>
              O objetivo do CPGG é também continuar atuando como uma interface entre o setor industrial,
              organizações governamentais e a Universidade Federal da Bahia, por meio das suas áreas
              específicas de pesquisa tendo em vista a geração de oportunidades educacionais em nível
              de pós-graduação, e iniciação científica para a graduação; a disseminação do conhecimento
              através da transferência de tecnologia para a sociedade; tendo para isso uma estrutura
              administrativa adequada para dar suporte a novas áreas de pesquisa.
            </p>
            <br></br>
            <p>
              Além de dar suporte aos cursos de doutorado, mestrado e graduação em Geofísica
              e em Geologia, o CPGG, a partir de 1999, deu início a um programa de Educação Continuada
              a nível de especialização com dois cursos em Sistemas Petrolíferos com ênfase em bacias
              sedimentares brasileiras e caracterização de reservatórios, dirigida ao pessoal da
              indústria.
           </p>
            <br></br>
            <p> 
              Após uma pausa de 5 anos, o CPGG voltou a ter seu corpo de pesquisadores ativo, agora sob
              a coordenação dos professsores Marcos Vasconcelos e Ruy Kikuchi. Um novo credenciamento foi
              realizado, de maneira que no momento atual, o órgão conta com {totalResearchers} pesquisadores distribuídos em
             cinco Programas de Pesquisa. O momento atual impele o CPGG a despertar o interesse de novos pesquisadores, com o intuito de somar esforços para construir um Centro mais forte, e proporcionando recursos para desenvolvimento de pesquisas de ponta.
             </p>
            
            <div className={styles.box1}>
              <h4 className={styles.legend1}>Hall de acesso da sede do CPGG</h4>
            </div>
            <div className={styles.box2}>
              <h4 className={styles.legend2}>Fachada da sede do CGG em segundo ângulo</h4>
            </div>
            <div className={styles.box3}>
              <h4 className={styles.legend3}>Fachada da sede do CGG em primeiro ângulo</h4>
            </div>
          </div>
          <div className={styles.staticFigure}>
            <img src={earth} alt='Terra' />
          </div>
        </div>
      </div>
      <div style={{ marginTop: '-50px' }}>
        <Footer />
      </div>
    </>
  )
}

