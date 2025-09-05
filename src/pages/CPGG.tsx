import fachada1 from '../assets/Photos/CPGG/fachada1.png';
import fachada2 from '../assets/Photos/CPGG/fachada2.png';
import entrada1 from '../assets/Photos/CPGG/entrada1.png';
import cpggStatic from '../components/Figures/cpgg-static.png';

export function CPGG() {
  return (
    <div className="text-justify text-lg leading-[35px] flex flex-1 text-white pt-35 pb-543 pl-280 pr-200 lg:pb-[700px] md:pb-[700px] xs:pb-[700px]">
      {/* Title */}
      <div className="Title">
        <ul className="text-[35px] text-gray-contact -mt-2 pl-300 pb-12 whitespace-nowrap font-bold lg:pl-200 md:pl-200 md:-mt-8 xs:pl-200 xs:-mt-8">
          <li>O CPGG</li>
        </ul>
      </div>

      {/* Main Content Box */}
      <div className="text-justify flex flex-col border-2 border-glass-border bg-glass-bg absolute w-900 h-125 top-[20%] left-[2%] p-5 pl-350 rounded-[20px] gap-1 -mb-125 overflow-y-scroll lg:top-[15%] md:top-[15%] md:h-200 xs:h-[1000px] xs:top-[25%] xs:left-[15%]">
        <p>
          O Centro de Pesquisa em Geofísica e Geologia (CPGG) é uma instituição de excelência acadêmica 
          e científica, dedicada ao avanço do conhecimento nas ciências da Terra. Fundado com o objetivo 
          de promover pesquisa de ponta e formar recursos humanos altamente qualificados, o CPGG tem se 
          destacado como referência nacional e internacional.
        </p>
        <p>
          Nossa missão é desenvolver pesquisas inovadoras em geofísica e geologia, contribuindo para 
          o entendimento dos processos terrestres e suas aplicações práticas. Trabalhamos em estreita 
          colaboração com instituições nacionais e internacionais, promovendo o intercâmbio científico 
          e tecnológico.
        </p>
        <p>
          O CPGG conta com laboratórios modernos e equipamentos de última geração, proporcionando 
          um ambiente propício para o desenvolvimento de pesquisas de alta qualidade. Nossa equipe 
          é composta por pesquisadores experientes e estudantes de graduação e pós-graduação, 
          criando um ambiente dinâmico e colaborativo.
        </p>
        <p>
          Entre nossas principais áreas de atuação estão: geofísica aplicada, geologia estrutural, 
          geoquímica, hidrogeologia, geofísica ambiental, e sísmica. Desenvolvemos projetos que 
          abrangem desde aspectos fundamentais até aplicações práticas em exploração mineral, 
          estudos ambientais e engenharia.
        </p>
      </div>

      {/* Image Box 1 - Facade 1 */}
      <div 
        className="text-center flex flex-col border-2 border-glass-border bg-glass-bg absolute w-300 h-300 top-[3%] left-[2%] p-2 rounded-[20px] gap-1 -mb-25 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(2,0,36,0.1) 0%, rgba(63,9,121,0.1) 100%), url(${fachada1})`
        }}
      >
        <div className="legend1 absolute text-xs right-2 left-2 top-[300px]">
          Fachada principal do CPGG
        </div>
      </div>

      {/* Image Box 2 - Facade 2 */}
      <div 
        className="text-center flex flex-col border-2 border-glass-border bg-glass-bg absolute w-300 h-300 top-[85%] left-[2%] p-2 rounded-[20px] gap-1 -mb-25 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(2,0,36,0.1) 0%, rgba(63,9,121,0.1) 100%), url(${fachada2})`
        }}
      >
        <div className="legend2 absolute text-xs right-2 left-2 top-[300px]">
          Vista lateral do edifício
        </div>
      </div>

      {/* Image Box 3 - Entrance */}
      <div 
        className="text-center flex flex-col border-2 border-glass-border bg-glass-bg absolute w-300 h-300 top-[165%] left-[2%] p-2 rounded-[20px] gap-1 -mb-25 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(2,0,36,0.1) 0%, rgba(63,9,121,0.1) 100%), url(${entrada1})`
        }}
      >
        <div className="legend3 absolute text-xs right-2 left-2 top-[300px]">
          Entrada principal
        </div>
      </div>

      {/* Static Figure */}
      <div className="staticFigure lg:hidden md:hidden xs:hidden">
        <img 
          src={cpggStatic} 
          alt="CPGG Static" 
          className="h-[40rem] -mt-[83px] pl-710 -mb-125"
        />
      </div>
    </div>
  );
}