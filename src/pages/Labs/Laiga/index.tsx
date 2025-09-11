import styles from './laiga.module.css'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import earth from '../../../assets/earth-imgur.png'

export function Laiga() {
  return (
    <>
      <Header />
      <div className={styles.laiga}>
        <div className={styles.Title} >
          <ul> LAIGA </ul>
          <a> Laboratório Integrado de Geofísica Aplicada </a>
          <div className={styles.box}>
          <p>
              O Laboratório Integrado de Geofísica Aplicada -LAIGA- foi criado no ano de 2023 com a reunião de equipamentos adquiridos por pesquisadores do CPGG. Localiza-se na sala 112 do Bloco D do Instituto de Geociências. Atualmente é um dos Laboratórios de Geofísica mais completos do Brasil em termos de variedade de equipamentos reunidos no mesmo espaço físico, contando em seu acervo com mais de 80 equipamentos e periféricos associados disponíveis para uso.
            </p>
            <br></br>
            <p>
              O LAIGA possui uma estrutura de cerca de 70 m<sup>2</sup> com três salas integradas: (i) almoxarifado; (ii) sala de dados; e (iii) eletrônica. Além disso, conta com uma sala de apoio de cerca de 35 m<sup>2</sup> onde
              ficam quardados os materiais de apoio para os trabalhos de campo.
            </p>
            <br></br>
            <p>
              Os principais objetivos do LAIGA consistem em (i) dar suporte às pesquisas internas dos pesquisadores do CPGG em todas as instâncias: graduação, pós-graduação e seus seus projetos de pesquisa; e (ii) fortalecer a pesquisa em Geofísica Aplicada de instituições parceiras de capital público e privado por meio de Convênios e Contratos de Prestação de Serviços.
            </p>
            <br></br>
            <p>
              O LAIGA está entre os laboratórios do CPGG que faz parte do Projeto de Desenvolvimento Institucional -PDI- criado para captação de recursos junto a outros órgãos públicos e empresas privadas. A coordenação do laboratório foi aprovada em reunião do Conselho Científico do CPGG no ano de 2024.
           </p>
            <br></br>
            <p> 
              Acesse o site da Plataforma Nacional de Infraestrutura de Pesquisa-PNIPE, e veja as fotos e mais detalhes sobre os equipamentos disponíveis. 
            </p>

             <nav>
              <a href="https://pnipe.mcti.gov.br/search?term=Laiga" target="_blank">Site do PNIPE</a>
            </nav>
            <p> 
              Para saber da disponibilidade dos equipamentos e solicitá-los para uso, acesse nossa plataforma de requerimento
            </p>
            <nav>
             <a href="/Labs/Laiga/ReservationForm">Requerimento de uso</a>
           </nav>
          <br></br>
           <b> Chefe do LAIGA</b>
           <span> Prof. Marcos Alberto Rodrigues Vasconcelos</span> 

            <div className={styles.box1}>
              <h4 className={styles.legend1}>Sala 1- Almoxarifado com equipamentos</h4>
            </div>
            <div className={styles.box2}>
              <h4 className={styles.legend2}>Sala 1-Sala de Dados</h4>
            </div>
            <div className={styles.box3}>
              <h4 className={styles.legend3}>Sala 3- Eletrônica</h4>
            </div>
            <div className={styles.box4}>
              <h4 className={styles.legend4}>Sala de apoio do LAIGA</h4>
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