import styles from './Researchers.module.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export function Researchers() {
  return (
    <>
      <Header />
      <div className={styles.researchers}>
        <div className={styles.Programs}>
          <ul>Programas de Pesquisa e Corpo Científico </ul>
          <div className={styles.box}>
          <div className={styles.Oil}>
            <h1>Exploração de Petróleo</h1>
            <nav> <a href='/Researchers/personal/Porsani' > Milton José Porsani (Chefe)</a> </nav>
            <nav> <a href='/Researchers/personal/Alexsandro' > Alexsandro Guerra Cerqueira</a> </nav>
            <nav> <a href='/Researchers/personal/Amin' > Amin Bassrei</a> </nav>
            <nav> <a href='/Researchers/personal/AnaV' > Ana Virgínia Alves de Santana</a> </nav>
            <nav> <a href='/Researchers/personal/Joelson' > Joelson da Conceição Batista</a> </nav>
            <nav> <a href='/Researchers/personal/LCesar' > Luiz Cesar Correa Gomes</a> </nav>
            <nav> <a href='/Researchers/personal/Reynam' > Reynam da Cruz Pestana</a> </nav>
            <nav> <a href='/Researchers/personal/Wilson' > Wilson Mouzer Figueiró</a> </nav>
          </div>
          
          <div className={styles.Environment}> 
            <h1>Recursos Hidricos e Ambientais</h1>
            <nav> <a href='/Researchers/personal/Alanna' >Alanna Costa Dutra (Chefe)</a> </nav>
            <nav> <a href='/Researchers/personal/Alexandre' >Alexandre Barreto Costa</a> </nav> 
            <nav> <a href='/Researchers/personal/Eduardo' >Eduardo Reis Viana Rocha Junior</a></nav> 
            <nav> <a href='/Researchers/personal/LRogerio' >Luiz Rogério Bastos Leal</a> </nav> 
            <nav> <a href='/Researchers/personal/MZucchi' >Maria do Rosário Zucchi</a> </nav> 
            <nav> <a href='/Researchers/personal/Susana' > Susana Silva Cavalcanti</a> </nav> 
            <nav> <a href='/Researchers/personal/Suzan' > Suzan Souza de Vasconcelos</a> </nav> 
          </div>

          <div className={styles.Mineral}>
            <h1> Petrologia, Metalogênese e Exp. Mineral</h1>
            <nav> <a href='/Researchers/personal/Edson' >Edson Emanuel Starteri Sampaio (Chefe)</a> </nav>
            <nav> <a href='/Researchers/personal/Alice' >Alice Marques Pereira Lau</a> </nav>
            <nav> <a href='/Researchers/personal/Angela' >Angela Beatriz de Menezes Leal</a> </nav>
            <nav> <a href='/Researchers/personal/Carlson' >Carlson de Matos Maia Leite</a> </nav>
            <nav> <a href='/Researchers/personal/Aroldo' >Aroldo Misi </a> </nav>
            <nav> <a href='/Researchers/personal/Jailma' >Jailma Santos de Souza de Oliveira</a> </nav>
            <nav> <a href='/Researchers/personal/Johildo' >Johildo Salomão Figuerêdo Barbosa</a> </nav>
            <nav> <a href='/Researchers/personal/Haroldo' >José Haroldo da Silva Sá</a> </nav>
            <nav> <a href='/Researchers/personal/Marcos' >Marcos Alberto Rodrigues Vasconcelos</a> </nav>
            <nav> <a href='/Researchers/personal/Simone' >Simone Cerqueira Pereira Cruz</a> </nav>
          </div>


          <div className={styles.Oceanography}> 
            <h1>Oceanografia Física</h1>
            <nav> <a href='/Researchers/personal/Camila' >Camila Brasil Louro da Silveira (Chefe)</a> </nav>
            <nav> <a href='/Researchers/personal/LFelipe' >Luis Felipe Ferreira de Mendonça</a> </nav>
            <nav> <a href='/Researchers/personal/Arthur' >Arthur Antonio Machado</a> </nav>
          </div>

          <div className={styles.Coast}> 
            <h1>Geologia Marinha e Costeira</h1>
             <a>  </a>
            <nav> <a href='/Researchers/personal/Landim' >José Maria Dominguez Landim (Chefe)</a> </nav>
            <nav> <a href='/Researchers/personal/RicardoM' >Ricardo Piazza Meireles</a> </nav>
            <nav> <a href='/Researchers/personal/Ruy' >Ruy Kenji Papa de Kikuchi</a> </nav>
             <a>  </a>
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
