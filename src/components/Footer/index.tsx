import bgFooter from "../Figures/bg-footer.png";

export function Footer() {
  return (
    <footer className="flex flex-col -mt-12 w-full relative justify-end">
      <div 
        className="w-full h-[300px] bg-cover bg-no-repeat relative z-10"
        style={{ backgroundImage: `url(${bgFooter})` }}
      />
      <div className="bg-[#00249c] flex h-[7vh] w-full relative items-center justify-center z-20">
        <nav>
          <div className="flex items-center justify-center">
            <a 
              href="https://www.linkedin.com/in/cpgg-centro-de-pesquisa-94768a304/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white no-underline pr-10 text-sm ml-25 -top-1 relative cursor-pointer font-roboto font-medium
                         lg:ml-25 lg:text-sm
                         md:ml-25 md:text-xs
                         sm:ml-25 sm:text-[10px]"
            >
              Linkedin
            </a>
            <a 
              href="http://www.pggeofisica.ufba.br/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white no-underline pr-10 text-sm ml-25 -top-1 relative cursor-pointer font-roboto font-medium
                         lg:ml-25 lg:text-sm
                         md:ml-25 md:text-xs
                         sm:ml-25 sm:text-[10px]"
            >
              Pós-Graduação em Geofísica
            </a>
            <a 
              href="https://pggeologia.ufba.br/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-white no-underline pr-10 text-sm ml-25 -top-1 relative cursor-pointer font-roboto font-medium
                         lg:ml-25 lg:text-sm
                         md:ml-25 md:text-xs
                         sm:ml-25 sm:text-[10px]"
            >
              Pós-Graduação em Geologia
            </a>
          </div>
        </nav>
      </div>
    </footer>
  )
}