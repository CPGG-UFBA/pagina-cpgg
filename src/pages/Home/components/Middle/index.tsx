import styles from './middle.module.css'
import earth from '../../../../components/Figures/earth3.png'
import conferenceRoom from '../../../../assets/conference-room.jpg'
import teamCollaboration from '../../../../assets/team-collaboration.jpg'

export function Middle() {
  return (
    <main className={styles.middle}>
      {/* Seção esquerda com duas imagens pequenas */}
      <div className={styles.leftSection}>
        <div className={styles.imageContainer}>
          <img src={conferenceRoom} alt="Sala de conferência" />
        </div>
        <div className={styles.imageContainer}>
          <img src={teamCollaboration} alt="Colaboração em equipe" />
        </div>
      </div>

      {/* Seção central com texto */}
      <div className={styles.centerSection}>
        <div className={styles.heroText}>
          <h1 className={styles.earthText}>Earth</h1>
          <h1 className={styles.goalText}>is our Goal</h1>
          <div className={styles.subtitle}>
            <p>Enjoy our best solutions for</p>
            <span className={styles.scientificText}>scientific</span>
            <p>and trade proposals</p>
          </div>
        </div>
      </div>

      {/* Seção direita com imagem da Terra */}
      <div className={styles.rightSection}>
        <div className={styles.earthContainer}>
          <img src={earth} alt="Terra" className={styles.earthImage} />
        </div>
      </div>

      {/* Ondas azuis na parte inferior */}
      <div className={styles.waves}></div>
    </main>
  )
}