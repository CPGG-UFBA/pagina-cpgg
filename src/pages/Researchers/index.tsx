import styles from './Researchers.module.css'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Link } from 'react-router-dom'

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
            <nav> <Link to='/researchers/personal/Porsani' > Milton José Porsani (Chefe)</Link> </nav>
            <nav> <Link to='/researchers/personal/Alexsandro' > Alexsandro Guerra Cerqueira</Link> </nav>
            <nav> <Link to='/researchers/personal/Amin' > Amin Bassrei</Link> </nav>
            <nav> <Link to='/researchers/personal/AnaV' > Ana Virgínia Alves de Santana</Link> </nav>
            <nav> <Link to='/researchers/personal/Joelson' > Joelson da Conceição Batista</Link> </nav>
            <nav> <Link to='/researchers/personal/LCesar' > Luiz Cesar Correa Gomes</Link> </nav>
            <nav> <Link to='/researchers/personal/Reynam' > Reynam da Cruz Pestana</Link> </nav>
            <nav> <Link to='/researchers/personal/Wilson' > Wilson Mouzer Figueiró</Link> </nav>
          </div>
          
          <div className={styles.Environment}> 
            <h1>Recursos Hidricos e Ambientais</h1>
            <nav> <Link to='/researchers/personal/Alanna' >Alanna Costa Dutra (Chefe)</Link> </nav>
            <nav> <Link to='/researchers/personal/Alexandre' >Alexandre Barreto Costa</Link> </nav> 
            <nav> <Link to='/researchers/personal/Eduardo' >Eduardo Reis Viana Rocha Junior</Link></nav> 
            <nav> <Link to='/researchers/personal/LRogerio' >Luiz Rogério Bastos Leal</Link> </nav> 
            <nav> <Link to='/researchers/personal/MZucchi' >Maria do Rosário Zucchi</Link> </nav> 
            <nav> <Link to='/researchers/personal/Susana' > Susana Silva Cavalcanti</Link> </nav> 
            <nav> <Link to='/researchers/personal/Suzan' > Suzan Souza de Vasconcelos</Link> </nav> 
          </div>

          <div className={styles.Mineral}>
            <h1> Petrologia, Metalogênese e Exp. Mineral</h1>
            <nav> <Link to='/researchers/personal/Edson' >Edson Emanuel Starteri Sampaio (Chefe)</Link> </nav>
            <nav> <Link to='/researchers/personal/Alice' >Alice Marques Pereira Lau</Link> </nav>
            <nav> <Link to='/researchers/personal/Angela' >Angela Beatriz de Menezes Leal</Link> </nav>
            <nav> <Link to='/researchers/personal/Carlson' >Carlson de Matos Maia Leite</Link> </nav>
            <nav> <Link to='/researchers/personal/Aroldo' >Aroldo Misi </Link> </nav>
            <nav> <Link to='/researchers/personal/Jailma' >Jailma Santos de Souza de Oliveira</Link> </nav>
            <nav> <Link to='/researchers/personal/Johildo' >Johildo Salomão Figuerêdo Barbosa</Link> </nav>
            <nav> <Link to='/researchers/personal/Haroldo' >José Haroldo da Silva Sá</Link> </nav>
            <nav> <Link to='/researchers/personal/Marcos' >Marcos Alberto Rodrigues Vasconcelos</Link> </nav>
            <nav> <Link to='/researchers/personal/Simone' >Simone Cerqueira Pereira Cruz</Link> </nav>
          </div>


          <div className={styles.Oceanography}> 
            <h1>Oceanografia Física</h1>
            <nav> <Link to='/researchers/personal/Camila' >Camila Brasil Louro da Silveira (Chefe)</Link> </nav>
            <nav> <Link to='/researchers/personal/LFelipe' >Luis Felipe Ferreira de Mendonça</Link> </nav>
            <nav> <Link to='/researchers/personal/Arthur' >Arthur Antonio Machado</Link> </nav>
          </div>

          <div className={styles.Coast}> 
            <h1>Geologia Marinha e Costeira</h1>
             <a>  </a>
            <nav> <Link to='/researchers/personal/Landim' >José Maria Dominguez Landim (Chefe)</Link> </nav>
            <nav> <Link to='/researchers/personal/RicardoM' >Ricardo Piazza Meireles</Link> </nav>
            <nav> <Link to='/researchers/personal/Ruy' >Ruy Kenji Papa de Kikuchi</Link> </nav>
             <a>  </a>
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
