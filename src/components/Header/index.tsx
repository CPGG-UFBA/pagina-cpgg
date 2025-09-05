import { NavLink } from "react-router-dom";
import logocpgg from "../Figures/cpgg.png";
import logoufba from "../Figures/LogoUfba.png";
import headerBg from "../Figures/header-bg.png";

export function Header() {
  return (
    <header 
      className="w-full h-screen fixed top-0 left-0 flex flex-row aspect-square bg-contain bg-no-repeat z-50"
      style={{ backgroundImage: `url(${headerBg})` }}
    >
      <div className="flex items-start ml-4 mt-4">
        <div className="flex-shrink-0 mr-4">
          <img src={logocpgg} alt="CPGG" className="h-12 xl:h-15 lg:h-12 md:h-12 sm:h-10" />
        </div>
        
        <div className="text-center mt-2">
          <h1 className="pt-1 pl-2 ml-1 mt-2 text-sm text-center whitespace-nowrap font-roboto font-medium xl:text-sm lg:text-sm md:text-sm sm:text-[9px]">
            Centro de Pesquisa em Geofísica e Geologia
          </h1>
          <h1 className="pt-1 pl-2 ml-1 mt-2 text-sm text-center whitespace-nowrap font-roboto font-medium xl:text-sm lg:text-sm md:text-sm sm:text-[9px]">
            Instituto de Geociências/Instituto de Física
          </h1>
          <h1 className="pt-1 pl-2 ml-1 mt-2 text-sm text-center whitespace-nowrap font-roboto font-medium xl:text-sm lg:text-sm md:text-sm sm:text-[9px]">
            Universidade Federal da Bahia
          </h1>
        </div>
      </div>

      <div className="flex-shrink-0 ml-8 mt-2">
        <img src={logoufba} alt="UFBA" className="h-[70px] mt-2 xl:h-[70px] lg:h-[50px] md:h-[50px] sm:h-[50px]" />
      </div>

      <nav className="ml-auto">
        <ul className="inline-flex list-none text-[#FF5733] ml-[510px] xl:ml-[410px] lg:ml-[250px] md:ml-[-30px] sm:ml-[50px] xs:ml-[100px]">
          <li className="w-[120px] m-4 p-4 mt-4 text-base md:text-sm">
            <NavLink 
              to="/upload" 
              className="no-underline text-white hover:text-white/80 transition-colors"
            >
              Adm
            </NavLink>
          </li>
          <li className="w-[120px] m-4 p-4 mt-4 text-base md:text-sm">
            <NavLink 
              to="/Contact" 
              className="no-underline text-white hover:text-white/80 transition-colors"
            >
              Contact us
            </NavLink>
          </li>
          <li className="w-[120px] m-4 p-4 mt-4 text-base md:text-sm">
            <NavLink 
              to="/" 
              className="no-underline text-white hover:text-white/80 transition-colors"
            >
              Home
            </NavLink>
          </li>
          <li className="w-[120px] m-4 p-4 mt-4 text-base md:text-sm">
            <NavLink 
              to="/sign" 
              className="no-underline text-white hover:text-white/80 transition-colors"
            >
              Sign
            </NavLink>
          </li>
          <li className="w-[120px] m-4 p-4 mt-4 text-base md:text-sm relative group">
            <a href="#" className="no-underline text-white hover:text-white/80 transition-colors">
              About us
            </a>
            
            {/* Submenu 1 */}
            <div className="hidden group-hover:block absolute bg-[#592cbb] opacity-90 -mt-8 text-lg z-[100] w-[190px]">
              <ul className="block">
                <li className="transition-all duration-700 w-[175px] hover:bg-white hover:bg-opacity-100">
                  <div className="relative group/submenu">
                    <a href="#" className="block px-4 py-2 text-white hover:text-black">
                      Instituição
                    </a>
                    {/* Submenu 2 */}
                    <div className="hidden group-hover/submenu:block absolute -mt-12 -ml-[220px] bg-[#592cbb] opacity-90 w-[190px]">
                      <ul>
                        <li className="transition-all duration-700 w-[190px] hover:bg-white hover:bg-opacity-100">
                          <NavLink 
                            to="/cpgg" 
                            className="block px-4 py-2 text-white hover:text-black"
                          >
                            O CPGG
                          </NavLink>
                        </li>
                        <li className="transition-all duration-700 w-[190px] hover:bg-white hover:bg-opacity-100">
                          <NavLink 
                            to="/history" 
                            className="block px-4 py-2 text-white hover:text-black"
                          >
                            Nossa História
                          </NavLink>
                        </li>
                        <li className="transition-all duration-700 w-[190px] hover:bg-white hover:bg-opacity-100">
                          <NavLink 
                            to="/regulations" 
                            className="block px-4 py-2 text-white hover:text-black"
                          >
                            Regimento e Normas
                          </NavLink>
                        </li>
                        <li className="transition-all duration-700 w-[190px] hover:bg-white hover:bg-opacity-100">
                          <NavLink 
                            to="/photos" 
                            className="block px-4 py-2 text-white hover:text-black"
                          >
                            Fotos
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                <li className="transition-all duration-700 w-[175px] hover:bg-white hover:bg-opacity-100">
                  <div className="relative group/submenu">
                    <a href="#" className="block px-4 py-2 text-white hover:text-black">
                      Pessoal
                    </a>
                    {/* Submenu 2 */}
                    <div className="hidden group-hover/submenu:block absolute -mt-12 -ml-[220px] bg-[#592cbb] opacity-90 w-[190px]">
                      <ul>
                        <li className="transition-all duration-700 w-[190px] hover:bg-white hover:bg-opacity-100">
                          <NavLink 
                            to="/coordination" 
                            className="block px-4 py-2 text-white hover:text-black"
                          >
                            Coordenação e Conselhos
                          </NavLink>
                        </li>
                        <li className="transition-all duration-700 w-[190px] hover:bg-white hover:bg-opacity-100">
                          <NavLink 
                            to="/researchers" 
                            className="block px-4 py-2 text-white hover:text-black"
                          >
                            Pesquisadores
                          </NavLink>
                        </li>
                        <li className="transition-all duration-700 w-[190px] hover:bg-white hover:bg-opacity-100">
                          <NavLink 
                            to="/technicians" 
                            className="block px-4 py-2 text-white hover:text-black"
                          >
                            Corpo Técnico
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                <li className="transition-all duration-700 w-[175px] hover:bg-white hover:bg-opacity-100">
                  <NavLink 
                    to="/labs" 
                    className="block px-4 py-2 text-white hover:text-black"
                  >
                    Laboratórios e reservas
                  </NavLink>
                </li>
                <li className="transition-all duration-700 w-[175px] hover:bg-white hover:bg-opacity-100">
                  <NavLink 
                    to="/spaces" 
                    className="block px-4 py-2 text-white hover:text-black"
                  >
                    Espaços e Reservas
                  </NavLink>
                </li>
                <li className="transition-all duration-700 w-[175px] hover:bg-white hover:bg-opacity-100">
                  <a href="#" className="block px-4 py-2 text-white hover:text-black">
                    Projetos de Pesquisa
                  </a>
                </li>
                <li className="transition-all duration-700 w-[175px] hover:bg-white hover:bg-opacity-100">
                  <a href="#" className="block px-4 py-2 text-white hover:text-black">
                    Produção Científica
                  </a>
                </li>
                <li className="transition-all duration-700 w-[175px] hover:bg-white hover:bg-opacity-100">
                  <NavLink 
                    to="/recipes" 
                    className="block px-4 py-2 text-white hover:text-black"
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