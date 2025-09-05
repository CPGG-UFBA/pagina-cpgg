import { Link } from 'react-router-dom';
import news1 from '../Figures/news1.png';
import news2 from '../Figures/news2.png';
import news3 from '../Figures/news3.png';
import staticFigure from '../Figures/static-figure.png';

export function Middle() {
  return (
    <div className="flex flex-row pt-35 px-6 pb-15 font-poppins lg:flex-col lg:px-2">
      {/* News List */}
      <ul className="absolute top-[78%] text-xs pl-[42px] lg:top-[58%] lg:pl-20">
        <li><Link to="/news/news1" className="text-white hover:text-primary transition-colors">Notícia 1</Link></li>
        <li><Link to="/news/news2" className="text-white hover:text-primary transition-colors">Notícia 2</Link></li>
        <li><Link to="/news/news3" className="text-white hover:text-primary transition-colors">Notícia 3</Link></li>
      </ul>

      {/* News Section */}
      <div className="h-auto w-full max-w-[400px] relative grid place-items-center overflow-hidden lg:w-[90%]">
        <div className="flex flex-col h-[600px] animate-scroll-vertical">
          {/* News Slide 1 */}
          <div className="h-full w-full flex p-4 items-center" style={{ perspective: '100px' }}>
            <img 
              src={news1} 
              alt="Notícia 1" 
              className="w-full transition-transform duration-1000 hover:translate-z-[20px]"
            />
          </div>
          
          {/* News Slide 2 */}
          <div className="h-full w-full flex p-4 items-center" style={{ perspective: '100px' }}>
            <img 
              src={news2} 
              alt="Notícia 2" 
              className="w-full transition-transform duration-1000 hover:translate-z-[20px]"
            />
          </div>
          
          {/* News Slide 3 */}
          <div className="h-full w-full flex p-4 items-center" style={{ perspective: '100px' }}>
            <img 
              src={news3} 
              alt="Notícia 3" 
              className="w-full transition-transform duration-1000 hover:translate-z-[20px]"
            />
          </div>
        </div>
      </div>

      {/* Static Text Section */}
      <div className="text-white mt-12 leading-[0.5] ml-18 text-[35px] lg:-mt-150 lg:ml-122 md:mr-[-100px] sm:mr-[-500px] sm:-mt-112">
        <div className="text-[90px] leading-[1.6] gradient-text lg:text-[70px] lg:leading-[5px] lg:mr-[-100px]">
          <strong>CPGG</strong>
        </div>
        <h1 className="md:leading-[55px] md:mt-5 md:mr-[-100px]">
          Centro de Pesquisa
        </h1>
        <h1>em Geofísica e Geologia</h1>
      </div>

      {/* Enjoy Section */}
      <div className="leading-[1.6] text-white pt-8 text-lg">
        <div className="text-[30px] leading-[1.6] gradient-text">
          <strong>Pesquisa</strong>
        </div>
        <p>e desenvolvimento em ciências da Terra</p>
      </div>

      {/* Static Figure */}
      <div className="ml-8 lg:ml-120 sm:ml-[150px]">
        <img 
          src={staticFigure} 
          alt="CPGG Illustration" 
          className="h-[40rem] max-h-[70rem] -mt-2 mb-12 mr-auto lg:mt-2 lg:h-120 sm:mt-25 sm:h-192"
        />
      </div>
    </div>
  );
}