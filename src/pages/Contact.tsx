import whatsappIcon from "../components/Figures/whatsapp-icon.png";
import contactFigure from "../components/Figures/contact-figure.png";

export function Contact() {
  return (
    <div className="flex flex-1 overflow-visible justify-center text-white pt-[150px] pb-[400px] pl-[700px] pr-2 lg:pl-[410px] md:pl-[250px] sm:pl-8">
      <div className="relative">
        {/* Contact List */}
        <ul className="text-[30px] text-gray-contact absolute -ml-1500 mt-100 lg:-ml-1000 md:-ml-800 sm:-ml-200">
          <li>Contatos</li>
        </ul>

        {/* Contact Information */}
        <p className="text-xl text-gray-contact absolute -ml-1500 mt-[150px] lg:-ml-1000 md:-ml-800 sm:-ml-200">
          Entre em contato conosco:
        </p>

        {/* Phone/Email Link */}
        <a 
          href="mailto:cpgg@ufba.br" 
          className="text-[30px] text-gray-contact absolute -ml-1500 mt-[250px] lg:-ml-1000 md:-ml-800 sm:-ml-200 hover:text-primary transition-colors"
        >
          cpgg@ufba.br
        </a>

        {/* Address */}
        <div className="text-xl text-gray-contact absolute -ml-1500 mt-300 lg:-ml-1000 md:-ml-800 sm:-ml-200">
          <strong>Endereço:</strong>
        </div>

        {/* Address Details */}
        <div className="text-xl text-gray-contact absolute -ml-1500 mt-[400px] lg:-ml-1000 md:-ml-800 sm:-ml-200">
          Instituto de Geociências - UFBA
        </div>

        {/* Phone */}
        <div className="text-xl text-gray-contact absolute -ml-1500 mt-[450px] lg:-ml-1000 md:-ml-800 sm:-ml-200">
          Tel: (71) 3283-8501
        </div>

        {/* WhatsApp Icon */}
        <div className="absolute -ml-435 mt-[250px] lg:-ml-500 md:-ml-300 sm:-ml-100">
          <img 
            src={whatsappIcon} 
            alt="WhatsApp" 
            className="h-10 w-10 cursor-pointer hover:scale-110 transition-transform"
          />
        </div>

        {/* Static Figure */}
        <div className="absolute">
          <img 
            src={contactFigure} 
            alt="Contact Illustration" 
            className="h-[40rem] pl-[275px] -mb-[350px] -mt-5 lg:h-80 lg:pl-2 md:h-80 md:pl-[150px] sm:h-60 sm:pl-4"
          />
        </div>
      </div>
    </div>
  )
}