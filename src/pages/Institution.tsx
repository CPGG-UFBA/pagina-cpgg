export function Institution() {
  return (
    <div className="columns-5 gap-12 flex flex-1 overflow-visible justify-center text-white text-lg pt-150 pb-6 pl-800 pr-2">
      {/* Main Title */}
      <ul className="text-[25px] text-gray-contact -ml-500 -mt-5 whitespace-nowrap font-semibold">
        <li>Corpo Técnico da Instituição</li>
      </ul>

      {/* Secretaria Section */}
      <div className="Secretaria">
        <h1 className="flex max-w-[10px] text-base text-gray-contact font-bold mt-12 -ml-40 pl-5 whitespace-nowrap">
          Secretaria
        </h1>
        <div className="flex text-sm -ml-38 mt-5 whitespace-nowrap">
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-primary transition-colors">Maria da Silva Santos</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Ana Beatriz Costa</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Carlos Eduardo Lima</a></li>
          </ul>
        </div>
      </div>

      {/* TI Section */}
      <div className="TI">
        <h1 className="flex text-base text-gray-contact font-bold mt-12 -ml-23 pl-12 whitespace-nowrap">
          Tecnologia da Informação
        </h1>
        <div className="flex text-sm -ml-18 mt-5 whitespace-nowrap">
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-primary transition-colors">João Pedro Oliveira</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Rafael Mendes Silva</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Lucas Ferreira Souza</a></li>
          </ul>
        </div>
      </div>

      {/* Motorista Section */}
      <div className="Motorista">
        <h1 className="flex text-base text-gray-contact font-bold mt-12 ml-4 pl-12 whitespace-nowrap">
          Motoristas
        </h1>
        <div className="flex text-sm ml-14 mt-5 whitespace-nowrap">
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-primary transition-colors">Antonio Carlos Pereira</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">José Roberto Almeida</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Paulo Henrique Santos</a></li>
          </ul>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="Manutencao">
        <h1 className="flex text-base text-gray-contact font-bold mt-12 ml-24 pl-12 whitespace-nowrap">
          Manutenção
        </h1>
        <div className="flex text-sm ml-28 mt-5 whitespace-nowrap">
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-primary transition-colors">Sebastião Rodrigues</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Francisco de Assis</a></li>
          </ul>
        </div>
      </div>

      <div className="Limpeza">
        <h1 className="flex text-base text-gray-contact font-bold mt-12 ml-40 pl-12 whitespace-nowrap">
          Limpeza
        </h1>
        <div className="flex text-sm ml-44 mt-5 whitespace-nowrap">
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-primary transition-colors">Conceição Aparecida</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Regina Lucia Silva</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Benedita dos Santos</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}