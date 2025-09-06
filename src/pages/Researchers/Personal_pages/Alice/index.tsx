import styles from './Alice.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import earth from '../../../../assets/earth-imgur.png'

export function Alice() {
  return (
    <>
      <Header />
      <div>
        <div className={styles.Professor} >
          <p> Alice Marques Pereira Lau </p>
          <div className={styles.box1}>
          Doutora em geologia (2019). Mestre em Geociências e Meio Ambiente (2014). Bacharel em Geofísica (2011). Pesquisadora e Professora Adjunta no Instituto de Geociências da Universidade Federal da Bahia IGEO-UFBA, ministrando aulas para os cursos de geologia, engenharias e biologia. Foi professora adjunta de 2019 a 2022 na Pontifícia Universidade Católica do Rio Grande do Sul PUC-RS, onde atuou nos cursos de física com linha em geofísica, engenharias e geografia. Atua na área de geociências com ênfase em geologia, topografia e geofísica aplicada a estudos ambientais, hidrogeologia, exploração mineral e geologia de engenharia. Pesquisadora e bolsista DTI-A do CNPq em projeto de pesquisa mineral. Revisora ad hoc de periódicos científicos e membro associada da SBG e SBGf.
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/8498244876614542" target="_blank">Currículo</a>
           </nav>
           <b> email</b>
           <p>alicelau@ufba.br</p> 
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