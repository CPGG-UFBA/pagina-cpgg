import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { GlobalEarth } from '@/components/GlobalEarth';
const logocpgg = "https://imgur.com/6HRTVzo.png";
const logoufba = "https://imgur.com/x7mquv7.png";
export function Header() {
  const { t } = useLanguage();
  
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.figure}>
          <img src={logocpgg} alt='CPGG' />
        </div>
        
        <div className={styles.block1}>
          <h1>{t('header.institutionTitle1')}</h1>
          <h1>{t('header.institutionTitle2')}</h1>
          <h1>{t('header.institutionTitle3')}</h1>
        </div>

        <div className={styles.logoufba}>
          <img src={logoufba} alt='UFBA' />
        </div>
      </div>

      <nav className={styles.navSection}>
        <ul className={styles.signup}>
          <li>
            <NavLink to='/Contact' className={styles.navLink}>
              {t('nav.contact')}
            </NavLink>
          </li>
          <li>
            <NavLink to='/' className={styles.navLink}>
              {t('nav.home')}
            </NavLink>
          </li>
          <li>
            <NavLink to='/sign' className={styles.navLink}>
              {t('nav.signin')}
            </NavLink>
          </li>
          <li>
            <a href='#' className={styles.navLink}>{t('nav.about')}</a>
            
            <div className={styles.submenu1}>
              <ul>
                <li className={styles.hoversub}> 
                  <a href='#'>{t('nav.institution')}</a>
                  <div className={styles.submenu2}>
                    <ul>
                      <li>
                        <NavLink to='/cpgg' className={styles.navLink}>
                          {t('nav.cpgg')}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to='/history' className={styles.navLink}>
                          {t('nav.history')}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to='/Regulations' className={styles.navLink}>
                          {t('nav.regulations')}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to='/Photos' className={styles.navLink}>
                          {t('nav.photos')}
                        </NavLink>
                      </li>
                    </ul>
                  </div> 
                </li>

                <li className={styles.hoversub}> 
                  <a href='#'>{t('nav.personnel')}</a>
                  <div className={`${styles.submenu2} ${styles.submenu2Personnel}`}>
                    <ul>
                      <li>
                        <NavLink to='/Coordination' className={styles.navLink}>
                          {t('nav.coordination')}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to='/researchers' className={styles.navLink}>
                          {t('nav.researchers')}
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to='/Technicians' className={styles.navLink}>
                          {t('nav.technicians')}
                        </NavLink>
                      </li>
                    </ul>
                  </div> 
                </li>
                <li>
                  <NavLink to='/research-projects' className={styles.navLink}>
                    {t('nav.researchProjects')}
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/production' className={styles.navLink}>
                    {t('nav.scientificProduction')}
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/Recipes' className={styles.navLink}>
                    {t('nav.recipes')}
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/Map' className={styles.navLink}>
                    Map
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href='#' className={styles.navLink}>Solicitações</a>
            
            <div className={styles.submenu1}>
              <ul>
                <li>
                  <NavLink to='/cpgg2' className={styles.navLink}>
                    {t('nav.labsReservations')}
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/spaces' className={styles.navLink}>
                    {t('nav.spacesReservations')}
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>

      <div className={styles.languageContainer}>
        <LanguageSelector />
      </div>
      
      <GlobalEarth />
    </header>
  );
}