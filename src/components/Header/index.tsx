import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import styles from "./Header.module.css";

const logocpgg = "https://imgur.com/6HRTVzo.png";
const logoufba = "https://imgur.com/x7mquv7.png";

export function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.figure}>
        <img src={logocpgg} alt='CPGG' />
      </div>
      
      <div className={styles.block1}>
        <h1>Centro de Pesquisa em Geofísica e Geologia</h1>
        <h1>Instituto de Geociências/Instituto de Física</h1>
        <h1>Universidade Federal da Bahia</h1>
      </div>

      <div className={styles.logoufba}>
        <img src={logoufba} alt='UFBA' />
      </div>
      
      <nav className="relative w-full">
        <div className="flex justify-between items-start w-full">
          <ul className={styles.signup}>
            <li>
              <NavLink to='/adm' className={styles.navLink}>
                Adm
              </NavLink>
            </li>
            <li>
              <NavLink to='/Contact' className={styles.navLink}>
                Contact us
              </NavLink>
            </li>
            <li>
              <NavLink to='/' className={styles.navLink}>
                Home
              </NavLink>
            </li>
            <li>
              <a href='#' className={styles.navLink}>About us</a>
              
              <div className={styles.submenu1}>
                <ul>
                  <li className={styles.hoversub}> 
                    <a href='#'>Instituição</a>
                    <div className={styles.submenu2}>
                      <ul>
                        <li>
                          <NavLink to='/cpgg' className={styles.navLink}>
                            O CPGG
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to='/history' className={styles.navLink}>
                            Nossa História
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to='/Regulations' className={styles.navLink}>
                            Regimento e Normas
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to='/Photos' className={styles.navLink}>
                            Fotos
                          </NavLink>
                        </li>
                      </ul>
                    </div> 
                  </li>

                  <li className={styles.hoversub}> 
                    <a href='#'>Pessoal</a>
                    <div className={styles.submenu2}>
                      <ul>
                        <li>
                          <NavLink to='/Coordination' className={styles.navLink}>
                            Coordenação e Conselhos
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to='/researchers' className={styles.navLink}>
                            Pesquisadores
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to='/Technicians' className={styles.navLink}>
                            Corpo Técnico
                          </NavLink>
                        </li>
                      </ul>
                    </div> 
                  </li>
                  <li>
                    <NavLink to='/Labs' className={styles.navLink}>
                      Laboratórios e reservas
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/Spaces' className={styles.navLink}>
                      Espaços e Reservas
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/research-projects' className={styles.navLink}>
                      Projetos de Pesquisa
                    </NavLink>
                  </li>
                  <li>
                    <a href='#'>Produção Científica</a>
                  </li>
                  <li>
                    <NavLink to='/Recipes' className={styles.navLink}>
                      Receitas
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          
          <div className="absolute top-4 right-8 z-50">
            {user ? (
              <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-gray-200">
                <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
                  Olá, {user.user_metadata?.full_name?.split(' ')[0] || user.email}
                </span>
                <Button 
                  onClick={handleSignOut} 
                  variant="outline" 
                  size="sm"
                  className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50 text-xs px-3 py-1"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-gray-200">
                <Button 
                  onClick={() => navigate('/auth')} 
                  variant="outline" 
                  size="sm"
                  className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50 text-xs px-3 py-1"
                >
                  Entrar
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}