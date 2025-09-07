import styles from './Coordination.module.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export function Coordination() {
  return (
    <>
      <Header />
      <div className={styles.heads}>
        <div className={styles.box1}>
        <div className={styles.coordination}>
          <ul>Coordenação </ul>
          <div className={styles.chief}>
            <h1>Coordenador</h1>
              <a> Marcos Alberto Rodrigues Vasconcelos</a>
            <h1>Coordenador Adjunto</h1>
              <b> Ruy Kenji Papa de Kikuchi</b>
          </div>
          </div>
        <div className={styles.box2}>
          <div className={styles.scientific}> 
            <h1>Conselho Científico</h1>
              <a>Camila Brasil da Silveira</a>
              <a>Edson Starteri Sampaio</a>
              <a>José Maria Landin Dominguez</a>
              <a>Luiz César Gomes Corrêa (rep. dos pesquisadores)</a>
              <a>Marcos Alberto Rodrigues Vasconcelos</a>
              <a>Milton José Porsani</a>
              <a> Reynam da Cruz Pestana (rep. pesquisadores sêniores)</a>
              <a> Ruy Kenji Papa de Kikuchi</a>
          </div>
        </div>
          
        <div className={styles.box3}>
          <div className={styles.deliberative}>
            <h1>Conselho Deliberativo</h1>
              <a>Cristóvão de Cássio da Trindade de Brito (presidente)</a>
              <a>Ricardo Carneiro de Miranda Filho</a>
              <a>Luiz Rogério Bastos Leal (rep. dos pesquisadores)</a>
              <a>Marcos Alberto Rodrigues Vasconcelos</a>
              <a>Ruy Kenji Papa de Kikuchi</a>
              <a>Onofre H. D. J. das Flores (rep. estudantil)</a>
              <a>Leonardo Moreira Batista (suplente estudantil)</a>
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
