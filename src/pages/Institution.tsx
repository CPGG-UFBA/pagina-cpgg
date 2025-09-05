export function Institution() {
  return (
    <div className="pb-206 lg:mb-30 md:mb-[90px] xs:mb-[750px]">
      <div className="flex text-white pt-4 pb-12 mb-12 pl-730 pr-2">
        {/* Main Title */}
        <ul className="absolute text-[22px] font-bold -ml-600 -mt-5">
          <li>Coordenação e Conselhos</li>
        </ul>

        {/* Box 1 - Chief Coordination */}
        <div className="text-center flex flex-col border-2 border-glass-border bg-glass-bg absolute w-100 h-[250px] top-[15%] left-[5%] p-2 rounded-[20px] gap-1 -mb-25 lg:left-[30%] md:left-[40%] xs:left-[80%] xs:top-[20%]">
          <div className="chief">
            <h1 className="absolute justify-center flex text-lg text-gray-contact font-bold mt-8 -ml-205">
              Coordenador Geral
            </h1>
            <a href="#" className="absolute justify-center flex text-sm -ml-175 mt-5 whitespace-nowrap">
              Prof. Dr. João Silva
            </a>
            <div className="absolute justify-center flex text-sm -ml-190 mt-5 whitespace-nowrap">
              <strong>Mandato: 2023-2025</strong>
            </div>
          </div>
        </div>

        {/* Box 2 - Scientific Council */}
        <div className="text-center flex flex-col border-2 border-glass-border bg-glass-bg absolute w-100 h-125 top-[-1%] left-[120%] p-2 rounded-[20px] gap-1 -mb-25 lg:left-[-55%] lg:top-[115%] md:left-[-60%] xs:left-[1%] xs:top-[110%]">
          <div className="scientific">
            <h1 className="absolute flex text-[22px] text-gray-contact font-bold -mt-1 ml-25 whitespace-nowrap">
              Conselho Científico
            </h1>
            <div className="text-center flex text-sm ml-8 mt-4 mb-10">
              <ul>
                <li>Prof. Dr. Maria Santos</li>
                <li>Prof. Dr. Carlos Oliveira</li>
                <li>Prof. Dr. Ana Costa</li>
                <li>Prof. Dr. Pedro Lima</li>
                <li>Prof. Dr. Lucia Rocha</li>
                <li>Prof. Dr. Roberto Alves</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Box 3 - Deliberative Council */}
        <div className="text-center flex flex-col border-2 border-glass-border bg-glass-bg absolute w-100 h-112 top-[-1%] left-[240%] p-2 rounded-[20px] gap-1 lg:left-[55%] lg:top-[115%] lg:h-125 md:left-[55%] md:top-[115%] xs:left-[1%] xs:top-[330%]">
          <div className="deliberative">
            <h1 className="flex text-[22px] text-gray-contact font-bold -mt-1 ml-25">
              Conselho Deliberativo
            </h1>
            <div className="text-center flex text-sm ml-8 mt-5 mb-10">
              <ul>
                <li>Representante Docente 1</li>
                <li>Representante Docente 2</li>
                <li>Representante Técnico</li>
                <li>Representante Discente</li>
                <li>Representante Externo</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}