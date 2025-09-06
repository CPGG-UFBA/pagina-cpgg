import styles from './Institution.module.css';

export function Institution() {
  return (
    <div className={styles.container}>
      {/* Main Title */}
      <ul className={styles.mainTitle}>
        <li>Corpo Técnico da Instituição</li>
      </ul>

      {/* Secretaria Section */}
      <div className={styles.section}>
        <h1 className={styles.sectionTitle}>
          Secretaria
        </h1>
        <div className={styles.sectionContent}>
          <ul className={styles.memberList}>
            <li><a href="#" className={styles.memberLink}>Maria da Silva Santos</a></li>
            <li><a href="#" className={styles.memberLink}>Ana Beatriz Costa</a></li>
            <li><a href="#" className={styles.memberLink}>Carlos Eduardo Lima</a></li>
          </ul>
        </div>
      </div>

      {/* TI Section */}
      <div className={styles.section}>
        <h1 className={styles.tiTitle}>
          Tecnologia da Informação
        </h1>
        <div className={styles.tiContent}>
          <ul className={styles.memberList}>
            <li><a href="#" className={styles.memberLink}>João Pedro Oliveira</a></li>
            <li><a href="#" className={styles.memberLink}>Mariana Souza Lima</a></li>
            <li><a href="#" className={styles.memberLink}>Rafael Santos Costa</a></li>
          </ul>
        </div>
      </div>

      {/* Manutenção Section */}
      <div className={styles.section}>
        <h1 className={styles.sectionTitle}>
          Manutenção
        </h1>
        <div className={styles.sectionContent}>
          <ul className={styles.memberList}>
            <li><a href="#" className={styles.memberLink}>José Carlos Ferreira</a></li>
            <li><a href="#" className={styles.memberLink}>Paulo Roberto Silva</a></li>
            <li><a href="#" className={styles.memberLink}>Antonio José Santos</a></li>
          </ul>
        </div>
      </div>

      {/* Laboratórios Section */}
      <div className={styles.section}>
        <h1 className={styles.sectionTitle}>
          Laboratórios
        </h1>
        <div className={styles.sectionContent}>
          <ul className={styles.memberList}>
            <li><a href="#" className={styles.memberLink}>Dra. Fernanda Rocha</a></li>
            <li><a href="#" className={styles.memberLink}>MSc. Lucas Pereira</a></li>
            <li><a href="#" className={styles.memberLink}>Téc. Sandra Oliveira</a></li>
            <li><a href="#" className={styles.memberLink}>Téc. Roberto Lima</a></li>
          </ul>
        </div>
      </div>

      {/* Biblioteca Section */}
      <div className={styles.section}>
        <h1 className={styles.sectionTitle}>
          Biblioteca
        </h1>
        <div className={styles.sectionContent}>
          <ul className={styles.memberList}>
            <li><a href="#" className={styles.memberLink}>Bibliotecária Juliana Costa</a></li>
            <li><a href="#" className={styles.memberLink}>Auxiliar Marina Santos</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}