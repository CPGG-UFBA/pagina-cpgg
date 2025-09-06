import fachada1 from '../../assets/Photos/CPGG/fachada1.png';
import fachada2 from '../../assets/Photos/CPGG/fachada2.png';
import entrada1 from '../../assets/Photos/CPGG/entrada1.png';
import cpggStatic from '../../components/Figures/cpgg-static.png';
import styles from './CPGG.module.css';

export function CPGG() {
  return (
    <div className={styles.container}>
      {/* Title */}
      <div className={styles.titleContainer}>
        <ul className={styles.title}>
          <li>O CPGG</li>
        </ul>
      </div>

      {/* Main Content Box */}
      <div className={styles.mainContent}>
        <p>
          O Centro de Pesquisa em Geofísica e Geologia (CPGG) é uma instituição de excelência acadêmica 
          e científica, dedicada ao avanço do conhecimento nas ciências da Terra. Fundado com o objetivo 
          de promover pesquisa de ponta e formar recursos humanos altamente qualificados, o CPGG tem se 
          destacado como referência nacional e internacional.
        </p>
        <p>
          Nossa missão é desenvolver pesquisas inovadoras em geofísica e geologia, contribuindo para 
          o entendimento dos processos terrestres e suas aplicações práticas. Trabalhamos em estreita 
          colaboração com instituições nacionais e internacionais, promovendo o intercâmbio científico 
          e tecnológico.
        </p>
        <p>
          O CPGG conta com uma equipe de pesquisadores altamente qualificados, laboratórios modernos 
          e equipamentos de última geração. Nossos programas de pós-graduação em Geofísica e Geologia 
          são reconhecidos pela CAPES e formam mestres e doutores que atuam em todo o Brasil e exterior.
        </p>
        <p>
          Entre nossas principais linhas de pesquisa estão: exploração de recursos naturais, 
          geofísica ambiental, sismologia, geologia estrutural, hidrogeologia, geoquímica e 
          modelagem computacional. Nossos projetos contribuem diretamente para o desenvolvimento 
          sustentável e a solução de problemas socioambientais.
        </p>
      </div>

      {/* Image Box 1 */}
      <div 
        className={styles.imageBox1}
        style={{ backgroundImage: `url(${fachada1})` }}
      >
        <div className={styles.legend1}>
          Fachada principal do CPGG - Vista externa do prédio que abriga nossa instituição
        </div>
      </div>

      {/* Image Box 2 */}
      <div 
        className={styles.imageBox2}
        style={{ backgroundImage: `url(${fachada2})` }}
      >
        <div className={styles.legend2}>
          Vista lateral do complexo - Área de convivência e laboratórios
        </div>
      </div>

      {/* Image Box 3 */}
      <div 
        className={styles.imageBox3}
        style={{ backgroundImage: `url(${entrada1})` }}
      >
        <div className={styles.legend3}>
          Entrada principal - Acesso ao hall de recepção e auditório
        </div>
      </div>

      <div className={styles.staticFigure}>
        <img 
          src={cpggStatic} 
          alt="CPGG Static" 
          className={styles.staticImage}
        />
      </div>
    </div>
  )
}