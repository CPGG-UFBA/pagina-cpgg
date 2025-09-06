import styles from './Simone.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import earth from '../../../../assets/earth-imgur.png'

export function Simone() {
  return (
    <>
      <Header />
      <div>
        <div className={styles.Professor} >
          <p> Simone Cerqueira Pereira Cruz </p>
          <div className={styles.box1}>
          Possui graduação em Bacharelado em Geologia pela Universidade Federal da Bahia (1997), mestrado em Evolução Crustal e Recursos Naturais pela Universidade Federal de Ouro Preto (2000) e doutorado em Evolução Crustal e Recursos Naturais pela Universidade Federal de Ouro Preto (2004), ambas com ênfase em Geologia Estrutural / Tectônica. Fez Pós-Doutotarado em Petrologia, Metalogênese e Exploração Mineral. Atualmente é professora Associada do Departamento de Geologia da Universidade Federal da Bahia, é Presidenta da Sociedade Brasileira de Geologia. Tem experiência na área de Geociências, com ênfase em Geologia Estrutural, Geotectônica e Recursos Minerais.

            <nav>
             <a href="http://lattes.cnpq.br/8624206151398922" target="_blank">Currículo</a>
           </nav>
           <b> email</b>
           <p>simonecruz@ufba.br</p> 
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