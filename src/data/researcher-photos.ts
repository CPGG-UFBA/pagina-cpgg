// Mapeamento de fotos dos pesquisadores por nome
export const researcherPhotos: Record<string, string> = {
  // Programa Oil
  'Milton José Porsani': 'https://i.imgur.com/porsani-photo.jpg',
  'Alexsandro Guerra Cerqueira': 'https://i.imgur.com/alexsandro-photo.jpg',
  'Amin Bassrei': 'https://i.imgur.com/amin-photo.jpg',
  'Ana Virgínia Alves de Santana': 'https://i.imgur.com/anav-photo.jpg',
  'Joelson da Conceição Batista': 'https://i.imgur.com/joelson-photo.jpg',
  'Luiz Cesar Correa Gomes': 'https://i.imgur.com/lcesar-photo.jpg',
  'Reynam da Cruz Pestana': 'https://i.imgur.com/reynam-photo.jpg',
  'Wilson Mouzer Figueiró': 'https://i.imgur.com/wilson-photo.jpg',

  // Programa Environment
  'Alanna Costa Dutra': 'https://i.imgur.com/alanna-photo.jpg',
  'Alexandre Barreto Costa': 'https://i.imgur.com/alexandre-photo.jpg',
  'Eduardo Reis Viana Rocha Junior': 'https://i.imgur.com/eduardo-photo.jpg',
  'Luiz Rogério Bastos Leal': 'https://i.imgur.com/lrogerio-photo.jpg',
  'Maria do Rosário Zucchi': 'https://i.imgur.com/mzucchi-photo.jpg',
  'Susana Silva Cavalcanti': 'https://i.imgur.com/susana-photo.jpg',
  'Suzan Souza de Vasconcelos': 'https://i.imgur.com/suzan-photo.jpg',

  // Programa Mineral
  'Edson Emanuel Starteri Sampaio': 'https://i.imgur.com/edson-photo.jpg',
  'Alice Marques Pereira Lau': 'https://i.imgur.com/alice-photo.jpg',
  'Angela Beatriz de Menezes Leal': 'https://i.imgur.com/angela-photo.jpg',
  'Carlson de Matos Maia Leite': 'https://i.imgur.com/carlson-photo.jpg',
  'Aroldo Misi': 'https://i.imgur.com/YQM1hAL.jpg',
  'Jailma Santos de Souza de Oliveira': 'https://i.imgur.com/jailma-photo.jpg',
  'Johildo Salomão Figuerêdo Barbosa': 'https://i.imgur.com/johildo-photo.jpg',
  'José Haroldo da Silva Sá': 'https://i.imgur.com/haroldo-photo.jpg',
  'Marcos Alberto Rodrigues Vasconcelos': 'https://i.imgur.com/marcos-photo.jpg',
  'Simone Cerqueira Pereira Cruz': 'https://i.imgur.com/simone-photo.jpg',

  // Programa Oceanography
  'Camila Brasil Louro da Silveira': 'https://i.imgur.com/camila-photo.jpg',
  'Arthur Antonio Machado': 'https://i.imgur.com/arthur-photo.jpg',

  // Programa Coast
  'José Maria Dominguez Landim': 'https://i.imgur.com/landim-photo.jpg',
  'Marília de Dirceu Machado de Oliveira': 'https://i.imgur.com/marilia-photo.jpg',
  'Ricardo Piazza Meireles': 'https://i.imgur.com/ricardom-photo.jpg',
  'Ruy Kenji Papa de Kikuchi': 'https://i.imgur.com/ruy-photo.jpg',
}

// Função para obter a foto de um pesquisador pelo nome
export const getResearcherPhoto = (name: string): string | undefined => {
  return researcherPhotos[name]
}
