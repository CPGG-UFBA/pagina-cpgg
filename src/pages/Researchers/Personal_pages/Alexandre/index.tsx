import styles from './alexandre.module.css'
import { Header } from '../../../../components/Header'
import { Footer } from '../../../../components/Footer'
import earth from '../../../../assets/earth-imgur.png'

export function Alexandre() {
  console.log('[Researchers] Alexandre page render');
  return (
    <>
      <Header />
      <div>
        <div className={styles.Professor} >
          <p> Alexandre Barreto Costa </p>
          <div className={styles.box1}>
          Possui graduação em Bacharelado Em Física pela Universidade Federal da Bahia (1997), mestrado em Geofísica pela Universidade Federal da Bahia (2001) e doutorado em Geofísica pela Universidade Federal da Bahia (2006). Atualmente é pesquisador do Centro de Pesquisa em Geofísica e Geologia da UFBA e professor associado IV da Universidade Federal da Bahia. Tem experiência na área de Geociências, atuando principalmente nos seguintes temas: Geotermia e Fluxo Térmico, espectrometria gama, análise de isótopos estáveis, datação por Carbono-14 e Chumbo-210 e dados de levantamentos aerogeofísicos.
            <ul> Link para Currículo Lattes</ul>

            <nav>
             <a href="http://lattes.cnpq.br/9954455880450271" target="_blank">Currículo</a>
           </nav>
           <b> email</b>
           <p>abc@ufba.br</p> 
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