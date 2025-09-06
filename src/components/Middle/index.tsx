import { Link } from 'react-router-dom';
import conferenceRoom from '../../assets/conference-room.jpg';
import teamCollaboration from '../../assets/team-collaboration.jpg';
import earthGlobe from '../../assets/earth-globe.jpg';
import blueWavesBg from '../../assets/blue-waves-bg.jpg';
import styles from './Middle.module.css';

export function Middle() {
  return (
    <div className={styles.container}>
      {/* Left Side - Images */}
      <div className={styles.leftSide}>
        <div className={styles.imageContainer}>
          <img 
            src={conferenceRoom} 
            alt="Conference Room" 
            className={styles.image}
          />
        </div>
        <div className={styles.imageContainer}>
          <img 
            src={teamCollaboration} 
            alt="Team Collaboration" 
            className={styles.image}
          />
        </div>
      </div>

      {/* Center - Main Content */}
      <div className={styles.centerContent}>
        <h1 className={styles.mainTitle}>
          Earth<br />
          <span className={styles.subtitle}>is our Goal</span>
        </h1>
        <p className={styles.description}>Enjoy our best solutions for</p>
        <p className={styles.description}>
          <span className={styles.scientificText}>scientific</span><br />
          and trade proposals
        </p>
      </div>

      {/* Right Side - Earth Globe */}
      <div className={styles.rightSide}>
        <img 
          src={earthGlobe} 
          alt="Earth Globe" 
          className={styles.earthGlobe}
        />
      </div>

      {/* Bottom Wave Pattern */}
      <div 
        className={styles.wavePattern}
        style={{ backgroundImage: `url(${blueWavesBg})` }}
      />

      {/* News Links - Positioned absolutely */}
      <div className={styles.newsContainer}>
        <p className={styles.newsText}>Clique sobre a notícia para mais detalhes</p>
      </div>
    </div>
  );
}