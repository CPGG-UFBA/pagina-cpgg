import { NavLink } from "react-router-dom";
import logocpgg from "../Figures/cpgg.png";
import logoufba from "../Figures/LogoUfba.png";
import headerBg from "../Figures/header-bg.png";
import styles from './Header.module.css';

export function Header() {
  return (
    <header 
      className={styles.header}
      style={{ backgroundImage: `url(${headerBg})` }}
    >
      <div className={styles.logoContainer}>
        <div className={styles.cpggLogo}>
          <img src={logocpgg} alt="CPGG" className={styles.cpggLogo} />
        </div>
        
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Centro de Pesquisa em Geofísica e Geologia
          </h1>
          <h1 className={styles.title}>
            Instituto de Geociências/Instituto de Física
          </h1>
          <h1 className={styles.title}>
            Universidade Federal da Bahia
          </h1>
        </div>
      </div>

      <div className={styles.ufbaLogoContainer}>
        <img src={logoufba} alt="UFBA" className={styles.ufbaLogo} />
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink 
              to="/upload" 
              className={styles.navLink}
            >
              Adm
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink 
              to="/Contact" 
              className={styles.navLink}
            >
              Contact us
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink 
              to="/" 
              className={styles.navLink}
            >
              Home
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink 
              to="/sign" 
              className={styles.navLink}
            >
              Sign
            </NavLink>
          </li>
          <li className={`${styles.navItem} ${styles.dropdownContainer}`}>
            <a href="#" className={styles.navLink}>
              About us
            </a>
            
            {/* Submenu 1 */}
            <div className={styles.dropdown}>
              <ul className={styles.dropdownList}>
                <li className={styles.dropdownItem}>
                  <div className={styles.submenu}>
                    <a href="#" className={styles.dropdownLink}>
                      Instituição
                    </a>
                    {/* Submenu 2 */}
                    <div className={styles.submenuDropdown}>
                      <ul>
                        <li className={styles.submenuItem}>
                          <NavLink 
                            to="/cpgg" 
                            className={styles.submenuLink}
                          >
                            O CPGG
                          </NavLink>
                        </li>
                        <li className={styles.submenuItem}>
                          <NavLink 
                            to="/history" 
                            className={styles.submenuLink}
                          >
                            Nossa História
                          </NavLink>
                        </li>
                        <li className={styles.submenuItem}>
                          <NavLink 
                            to="/regulations" 
                            className={styles.submenuLink}
                          >
                            Regimento e Normas
                          </NavLink>
                        </li>
                        <li className={styles.submenuItem}>
                          <NavLink 
                            to="/photos" 
                            className={styles.submenuLink}
                          >
                            Fotos
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                <li className={styles.dropdownItem}>
                  <div className={styles.submenu}>
                    <a href="#" className={styles.dropdownLink}>
                      Pessoal
                    </a>
                    {/* Submenu 2 */}
                    <div className={styles.submenuDropdown}>
                      <ul>
                        <li className={styles.submenuItem}>
                          <NavLink 
                            to="/coordination" 
                            className={styles.submenuLink}
                          >
                            Coordenação e Conselhos
                          </NavLink>
                        </li>
                        <li className={styles.submenuItem}>
                          <NavLink 
                            to="/researchers" 
                            className={styles.submenuLink}
                          >
                            Pesquisadores
                          </NavLink>
                        </li>
                        <li className={styles.submenuItem}>
                          <NavLink 
                            to="/technicians" 
                            className={styles.submenuLink}
                          >
                            Corpo Técnico
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                <li className={styles.dropdownItem}>
                  <NavLink 
                    to="/labs" 
                    className={styles.dropdownLink}
                  >
                    Laboratórios e reservas
                  </NavLink>
                </li>
                <li className={styles.dropdownItem}>
                  <NavLink 
                    to="/spaces" 
                    className={styles.dropdownLink}
                  >
                    Espaços e Reservas
                  </NavLink>
                </li>
                <li className={styles.dropdownItem}>
                  <a href="#" className={styles.dropdownLink}>
                    Projetos de Pesquisa
                  </a>
                </li>
                <li className={styles.dropdownItem}>
                  <a href="#" className={styles.dropdownLink}>
                    Produção Científica
                  </a>
                </li>
                <li className={styles.dropdownItem}>
                  <NavLink 
                    to="/recipes" 
                    className={styles.dropdownLink}
                  >
                    Receitas
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}