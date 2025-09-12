import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    // Header
    'nav.home': 'Início',
    'nav.about': 'Sobre Nós',
    'nav.researchers': 'Pesquisadores',
    'nav.labs': 'Laboratórios',
    'nav.spaces': 'Espaços',
    'nav.reservations': 'Reservas',
    'nav.photos': 'Fotos',
    'nav.contact': 'Contato',
    'nav.admin': 'Adm',
    'nav.signin': 'Entrar',
    
    // Submenus
    'nav.institution': 'Instituição',
    'nav.cpgg': 'O CPGG',
    'nav.history': 'Nossa História',
    'nav.regulations': 'Regimento e Normas',
    'nav.personnel': 'Pessoal',
    'nav.coordination': 'Coordenação e Conselhos',
    'nav.technicians': 'Corpo Técnico',
    'nav.labsReservations': 'Laboratórios e reservas',
    'nav.spacesReservations': 'Espaços e Reservas',
    'nav.researchProjects': 'Projetos de Pesquisa',
    'nav.scientificProduction': 'Produção Científica',
    'nav.recipes': 'Receitas',
    // Header Institution Names
    'header.institutionTitle1': 'Centro de Pesquisa em Geofísica e Geologia',
    'header.institutionTitle2': 'Instituto de Geociências/Instituto de Física',
    'header.institutionTitle3': 'Universidade Federal da Bahia',
    
    // Footer
    'footer.oldPage': 'Página Antiga-CPGG',
    'footer.linkedin': 'Linkedin',
    'footer.instagram': 'Instagram',
    'footer.postGradGeophysics': 'Pós-Graduação em Geofísica',
    'footer.postGradGeology': 'Pós-Graduação em Geologia',
    'footer.rights': '© Todos os direitos reservados',
    
    // Contact
    'contact.emailUs': 'Envie-nos um e-mail',
    'contact.copyLink': 'Copiar link',
    'contact.address': 'Av. Anita Garibaldi, s/n -Acesso Portão 2. Ondina, Salvador - BA, 40170-290',
    'contact.building': 'Bloco E- Anexo ao Instituto de Geociências',
    
    // Toast messages
    'toast.linkCopied': 'Link copiado',
    'toast.linkCopiedDesc': 'Abra uma nova guia e cole o link para iniciar a conversa.',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.researchers': 'Researchers',
    'nav.labs': 'Laboratories',
    'nav.spaces': 'Spaces',
    'nav.reservations': 'Reservations',
    'nav.photos': 'Photos',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'nav.signin': 'Sign In',
    
    // Submenus
    'nav.institution': 'Institution',
    'nav.cpgg': 'The CPGG',
    'nav.history': 'Our History',
    'nav.regulations': 'Regulations and Standards',
    'nav.personnel': 'Personnel',
    'nav.coordination': 'Coordination and Councils',
    'nav.technicians': 'Technical Staff',
    'nav.labsReservations': 'Laboratories and Reservations',
    'nav.spacesReservations': 'Spaces and Reservations',
    'nav.researchProjects': 'Research Projects',
    'nav.scientificProduction': 'Scientific Production',
    'nav.recipes': 'Recipes',
    
    // Header Institution Names
    'header.institutionTitle1': 'Center for Research in Geophysics and Geology',
    'header.institutionTitle2': 'Institute of Geosciences/Institute of Physics',
    'header.institutionTitle3': 'Federal University of Bahia',
    
    // Footer
    'footer.oldPage': 'Old Page-CPGG',
    'footer.linkedin': 'Linkedin',
    'footer.instagram': 'Instagram',
    'footer.postGradGeophysics': 'Graduate Program in Geophysics',
    'footer.postGradGeology': 'Graduate Program in Geology',
    'footer.rights': '© All rights reserved',
    
    // Contact
    'contact.emailUs': 'E-mail us at',
    'contact.copyLink': 'Copy link',
    'contact.address': 'Av. Anita Garibaldi, s/n -Access Gate 2. Ondina, Salvador - BA, 40170-290',
    'contact.building': 'Block E- Annex to the Institute of Geosciences',
    
    // Toast messages
    'toast.linkCopied': 'Link copied',
    'toast.linkCopiedDesc': 'Open a new tab and paste the link to start the conversation.',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}