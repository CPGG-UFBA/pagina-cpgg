import styles from './Coordination.module.css';

export function Coordination() {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        {/* Main Title */}
        <ul className={styles.mainTitle}>
          <li>Coordenação e Conselhos</li>
        </ul>

        {/* Box 1 - Chief Coordination */}
        <div className={styles.coordinationBox}>
          <div className="chief">
            <h1 className={styles.chiefTitle}>
              Coordenador Geral
            </h1>
            <a href="#" className={styles.chiefName}>
              Prof. Dr. João Silva
            </a>
            <div className={styles.chiefMandate}>
              <strong>Mandato: 2023-2025</strong>
            </div>
          </div>
        </div>

        {/* Box 2 - Scientific Council */}
        <div className={styles.scientificBox}>
          <div className="scientific">
            <h1 className={styles.scientificTitle}>
              Conselho Científico
            </h1>
            <div className={styles.scientificMembers}>
              <ul>
                <li><a href="#">Prof. Dr. Maria Santos</a></li>
                <li><a href="#">Prof. Dr. Carlos Lima</a></li>
                <li><a href="#">Prof. Dr. Ana Costa</a></li>
                <li><a href="#">Prof. Dr. Pedro Oliveira</a></li>
                <li><a href="#">Prof. Dr. Luiza Ferreira</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Box 3 - Deliberative Council */}
        <div className={styles.deliberativeBox}>
          <div className="deliberative">
            <h1 className={styles.deliberativeTitle}>
              Conselho Deliberativo
            </h1>
            <div className={styles.deliberativeMembers}>
              <ul>
                <li><a href="#">Prof. Dr. Roberto Silva</a></li>
                <li><a href="#">Prof. Dr. Fernanda Souza</a></li>
                <li><a href="#">Prof. Dr. Marcos Pereira</a></li>
                <li><a href="#">Prof. Dr. Juliana Rocha</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}