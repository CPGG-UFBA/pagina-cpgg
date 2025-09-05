import { NavLink } from "react-router-dom";
import logocpgg from "../Figures/cpgg.png";
import logoufba from "../Figures/LogoUfba.png";

export function Header() {
  return (
    <header className="bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0">
            <img src={logocpgg} alt="CPGG" className="h-16 w-auto" />
          </div>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-foreground">Centro de Pesquisa em Geofísica e Geologia</h1>
            <h1 className="text-sm text-muted-foreground">Instituto de Geociências/Instituto de Física</h1>
            <h1 className="text-sm text-muted-foreground">Universidade Federal da Bahia</h1>
          </div>
        </div>

        <div className="flex-shrink-0">
          <img src={logoufba} alt="UFBA" className="h-16 w-auto" />
        </div>
      </div>

      <nav className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center space-x-8 py-3">
            <li>
              <NavLink 
                to="/Contact" 
                className={({ isActive }) => 
                  `hover:text-primary-foreground/80 transition-colors ${isActive ? 'font-semibold' : ''}`
                }
              >
                Contact us
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `hover:text-primary-foreground/80 transition-colors ${isActive ? 'font-semibold' : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/Sign" 
                className={({ isActive }) => 
                  `hover:text-primary-foreground/80 transition-colors ${isActive ? 'font-semibold' : ''}`
                }
              >
                Sign
              </NavLink>
            </li>
            <li className="relative group">
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">
                About us
              </a>
              
              <div className="absolute top-full left-0 mt-1 bg-background border border-border shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[200px]">
                <ul className="py-2">
                  <li className="relative group/submenu">
                    <a href="#" className="block px-4 py-2 text-foreground hover:bg-muted">
                      Instituição
                    </a>
                    <div className="absolute left-full top-0 ml-1 bg-background border border-border shadow-lg rounded-md opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200 z-50 min-w-[200px]">
                      <ul className="py-2">
                        <li>
                          <NavLink 
                            to="/cpgg" 
                            className="block px-4 py-2 text-foreground hover:bg-muted"
                          >
                            O CPGG
                          </NavLink>
                        </li>
                        <li>
                          <NavLink 
                            to="/history" 
                            className="block px-4 py-2 text-foreground hover:bg-muted"
                          >
                            Nossa História
                          </NavLink>
                        </li>
                        <li>
                          <NavLink 
                            to="/Regulations" 
                            className="block px-4 py-2 text-foreground hover:bg-muted"
                          >
                            Regimento e Normas
                          </NavLink>
                        </li>
                        <li>
                          <NavLink 
                            to="/Photos" 
                            className="block px-4 py-2 text-foreground hover:bg-muted"
                          >
                            Fotos
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="relative group/submenu">
                    <a href="#" className="block px-4 py-2 text-foreground hover:bg-muted">
                      Pessoal
                    </a>
                    <div className="absolute left-full top-0 ml-1 bg-background border border-border shadow-lg rounded-md opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible transition-all duration-200 z-50 min-w-[200px]">
                      <ul className="py-2">
                        <li>
                          <NavLink 
                            to="/Coordination" 
                            className="block px-4 py-2 text-foreground hover:bg-muted"
                          >
                            Coordenação e Conselhos
                          </NavLink>
                        </li>
                        <li>
                          <NavLink 
                            to="/Researchers" 
                            className="block px-4 py-2 text-foreground hover:bg-muted"
                          >
                            Pesquisadores
                          </NavLink>
                        </li>
                        <li>
                          <NavLink 
                            to="/Technicians" 
                            className="block px-4 py-2 text-foreground hover:bg-muted"
                          >
                            Corpo Técnico
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li>
                    <NavLink 
                      to="/Labs" 
                      className="block px-4 py-2 text-foreground hover:bg-muted"
                    >
                      Laboratórios e reservas
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/Spaces" 
                      className="block px-4 py-2 text-foreground hover:bg-muted"
                    >
                      Espaços e Reservas
                    </NavLink>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-foreground hover:bg-muted">
                      Projetos de Pesquisa
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-foreground hover:bg-muted">
                      Produção Científica
                    </a>
                  </li>
                  <li>
                    <NavLink 
                      to="/Recipes" 
                      className="block px-4 py-2 text-foreground hover:bg-muted"
                    >
                      Receitas
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}