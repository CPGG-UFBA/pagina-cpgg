import styles from './Angela.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import earth from '../../../../assets/earth-imgur.png'

export function Angela() {
  return (
    <>
      <Header />
      <div>
        <div className={styles.Professor} >
          <p> Angela Beatriz de Menezes Leal </p>
          <div className={styles.box1}>
          A pesquisadora possui graduação em Geologia pela Universidade Federal da Bahia (1988), mestrado em Geociências (Mineralogia e Petrologia) pela Universidade de São Paulo (1992), doutorado em Geociências (Mineralogia e Petrologia) pela Universidade de São Paulo (1997), Pós-Doutorado pela University of Texas at San Antonio (2006-2007), na Universite Blaise Pascal Clermont-Ferrand (2010) e na University of Florida (2022, em andamento). Atualmente é Professora Titular da Universidade Federal da Bahia e atua como professora permanente no Curso de Pós-Graduação em Geologia na área de Petrologia, Metalogênese e Exploração Mineral. É vice-lider do Grupo de Pesquisa Núcleo de Geologia Básica na Plataforma Lattes. Tem experiência na área de Geociências, com ênfase em petrologia, geoquímica e geocronologia, atuando principalmente nos seguintes temas: diques máficos, greenstone belts, magmatismo máfico e ultramáfico.
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4797800A4" target="_blank">Currículo</a>
           </nav>
           <b> email</b>
           <p>angelab@ufba.br</p> 
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